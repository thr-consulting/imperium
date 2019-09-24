import debug from 'debug';
import {compare, hash} from 'bcrypt';
import {pseudoRandomBytes, randomBytes} from 'crypto';
import {sign, decode} from 'jsonwebtoken';
import get from 'lodash/get';
import set from 'lodash/set';
import find from 'lodash/find';
import {Context, ImperiumOptions, ModelsOptions} from '@imperium/core';
// @ts-ignore
import {randomId, SharedCache, sha256} from '@thx/extras/server';
import {ServerAuth, ClientAuth, LoginRet} from '../../../types';
import {
	IncorrectPasswordError,
	InvalidHashAlgorithm,
	TokenDeauthorized,
	TokenExpired,
	TokenNotValid,
	TooManyLoginAttempts,
	UserNotFoundError,
} from './errors';

const d = debug('imperium.auth.Auth');

interface PasswordObject {
	algorithm: string;
	digest: string;
}
type Password = PasswordObject | string;

/**
 * Takes in a string or password object and returns the hashed password object. Enforces sha-256 algorithm.
 * @private
 * @param {string|object} password - The string password or password object with algorithm and digest fields.
 * @return {string} The password object.
 */
function getPasswordString(password: Password): string {
	if (typeof password === 'string') {
		return sha256(password);
	}
	if (password.algorithm !== 'sha-256') {
		throw InvalidHashAlgorithm();
	}
	return password.digest.toLowerCase();
}

/**
 * Validates a password.
 * @private
 * @param bcrypt - Encrypted hash of password.
 * @param password - Plaintext actual password.
 * @return {Promise<boolean>} True if passwords match.
 */
export async function validatePassword(bcrypt: string, password: Password): Promise<boolean> {
	const pword = getPasswordString(password);
	return compare(pword, bcrypt);
}

/**
 * Model class for authentication. Uses a Mongo `roles` collection and has an opinionated user object.
 */
export default class Auth {
	_ctx: Context;
	_cache: SharedCache;
	_options: ImperiumOptions;

	constructor({context, connectors, options}: ModelsOptions) {
		this._ctx = context;
		this._cache = connectors.sharedCache;
		this._options = options;

		if (!this._cache) throw new Error('Shared cache not defined in Connectors with key "sharedCache".');
	}

	/**
	 * Returns a default (blank) authentication object (for server)
	 * @return {Object}
	 */
	defaultAuth(): ServerAuth {
		return {
			userId: null,
			user: async () => null,
			permissions: [],
		};
	}

	/**
	 * Builds an authentication object from a decoded JWT
	 * @param decodedJwt
	 * @return {Promise<Object>} The authentication object created from decoded JWT data.
	 */
	async buildAuthFromJwt(decodedJwt: {[key: string]: any}): Promise<ServerAuth> {
		const {User, Role} = this._ctx.models;

		return {
			userId: decodedJwt.id,
			user: async () => {
				// This function retrieves the basic user information
				const user = await User.findById(decodedJwt.id);
				if (!user) return null;
				return User.getData(user).basicInfo;
			},
			permissions: await Role.getPermissions(decodedJwt.roles),
		};
	}

	/**
	 * Takes in an authentication object and serializes it for transport to the client.
	 * @param {Object} auth - The object that will be serialized.
	 * @return {Promise<Object>} The object that can be serialized.
	 */
	async serializeAuth(auth: ServerAuth): Promise<ClientAuth> {
		const user = await auth.user();
		return {
			userId: auth.userId,
			permissions: auth.permissions,
			user,
		};
	}

	/**
	 * Creates a signed JWT from user data.
	 * @param payload
	 * @param options
	 * @param secret
	 * @return {string}
	 */
	signJwt(payload = {}, options: {[key: string]: any}, secret: string): string {
		// Generate 4 random bytes to encode into the JWT
		const numBytes = Math.ceil(4);
		let bytes;
		try {
			bytes = randomBytes(numBytes);
		} catch (e) {
			bytes = pseudoRandomBytes(numBytes);
		}
		const rnd = bytes.toString('hex').substring(0, 4);

		return sign(
			Object.assign(
				{},
				{
					rnd,
				},
				payload,
			),
			secret,
			options,
		);
	}

	signAccessToken(payload = {}, options = {expiresIn: this._options.authAccessTokenExpires}) {
		return this.signJwt(payload, options, this._options.authAccessTokenSecret);
	}

	signRefreshToken(payload = {}, options = {expiresIn: this._options.authRefreshTokenExpires}) {
		return this.signJwt(payload, options, this._options.authRefreshTokenSecret);
	}

	/**
	 * Encrypts a password
	 * @param password
	 * @return {Promise<string>}
	 */
	async encryptPassword(password: Password): Promise<string> {
		const pword = getPasswordString(password);
		return hash(pword, this._options.authPasswordSaltRounds);
	}

	/**
	 * Takes a refresh token and creates a new access token
	 * @param {string} refreshToken
	 */
	async refreshAccessToken(refreshToken: string): Promise<string> {
		const token = decode(refreshToken);

		if (!token || !token.id || !token.exp) {
			throw TokenNotValid();
		} else if (Date.now() / 1000 > token.exp) {
			throw TokenExpired();
		} else {
			const {User} = this._ctx.models;
			const user = await User.findById(token.id);
			if (!user) throw UserNotFoundError();
			const {servicesField, roles} = User.getData(user);
			if (find(get(user, [servicesField, 'token', 'blacklist'], []), {token: token.rnd})) {
				throw TokenDeauthorized();
			} else {
				return this.signRefreshToken({id: token.id, roles});
			}
		}
	}

	/**
	 * Attempts the log in process.
	 * @param {string} email - The email to log in with.
	 * @param {string|object} password - The password string/object to log in with.
	 * @return {Promise<{jwt: string, auth: {userId, permissions: void, user: {id, profile: {name: string, firstName: *, lastName: *}, emails: *}}}>}
	 */
	async logIn(email: string, password: Password): Promise<LoginRet> {
		const attempts = (await this._cache.get(`loginattempts:${email}`)) || 0;
		d(`Starting log in process: ${email} (Attempt: ${attempts + 1})`);

		if (attempts > this._options.authMaxFail) throw TooManyLoginAttempts();

		// Verify parameters
		const {User, Role} = this._ctx.models;

		if (!User) throw new Error('User model not defined');

		const user = await User.findOne().byEmail(email);
		if (!user) throw UserNotFoundError();

		const {id, basicInfo, roles, servicesField} = User.getData(user);
		const userPassword = get(user, [servicesField, 'password', 'bcrypt']);

		if (userPassword) {
			if (await validatePassword(userPassword, password)) {
				d('Everything validated. Returning access token, refresh token and auth');
				return {
					access: this.signAccessToken({id, roles}),
					refresh: this.signRefreshToken({id}),
					auth: {
						userId: id,
						permissions: await Role.getPermissions(roles),
						user: basicInfo,
					},
				};
			}
		}

		d(`Incorrect password: ${email}`);
		await this._cache.set(`loginattempts:${email}`, attempts + 1, this._options.authMaxCooldown);
		throw IncorrectPasswordError();
	}

	async forgotPassword(email: string): Promise<boolean> {
		d(`Requesting forgotten password ${email}`);
		const {User} = this._ctx.models;

		// Get user
		const user = await User.findOne().byEmail(email);
		// We return "success" here because we don't want to notify the client that we have a user with the specified email.
		if (!user) return true;

		// Get the previous recovery tokens
		const {servicesField} = User.getData(user);
		const recoveryTokens = get(user, [servicesField, 'token', 'recovery'], []);

		// Create a new recovery token
		const newToken = this.signAccessToken(
			{recovery: randomId(32)},
			{expiresIn: this._options.authRecoveryTokenExpires},
		);

		// Update the user object with the recovery token.
		set(user, [servicesField, 'token', 'recovery'], recoveryTokens.concat([newToken]));
		await user.save();

		return true;
	}

	async signUp(email: string): Promise<boolean> {
		d(email);
		return true;
	}
}
