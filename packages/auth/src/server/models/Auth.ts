import debug from 'debug';
import {compare, hash} from 'bcrypt';
import {pseudoRandomBytes, randomBytes} from 'crypto';
import {sign, decode} from 'jsonwebtoken';
import get from 'lodash/get';
import set from 'lodash/set';
import find from 'lodash/find';
import {Context} from '@imperium/core';
import {randomId, SharedCache} from '@thx/extras/server';
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
import sha256 from './sha256';

const d = debug('imperium.auth.Auth');

/**
 * Takes in a string or password object and returns the hashed password object. Enforces sha-256 algorithm.
 * @private
 * @param {string|object} password - The string password or password object with algorithm and digest fields.
 * @return {string} The password object.
 */
function getPasswordString(password): string {
	let pword = password;
	if (typeof pword === 'string') {
		pword = sha256(pword);
	} else {
		if (password.algorithm !== 'sha-256') {
			throw InvalidHashAlgorithm();
		}
		pword = pword.digest.toLowerCase();
	}
	return pword;
}

/**
 * Validates a user object and a password string/object.
 * @private
 * @param bcrypt - Encrypted password
 * @param password
 * @return {Promise<boolean>}
 */
export async function validatePassword(bcrypt, password): Promise<boolean> {
	const pword = getPasswordString(password);
	return compare(pword, bcrypt);
}

/**
 * Model class for authentication. Uses a Mongo `roles` collection and has an opinionated user object.
 */
export default class Auth {
	_ctx: Context;
	_cache: SharedCache;

	constructor(ctx, {sharedCache}) {
		this._ctx = ctx;
		this._cache = sharedCache;

		if (!sharedCache) throw new Error('Shared cache not defined in Connectors');
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
	 * @param decodedJWT
	 * @return {Promise<Object>} The authentication object created from decoded JWT data.
	 */
	async buildAuthFromJwt(decodedJWT): Promise<ServerAuth> {
		const {User, Role} = this._ctx.models;

		return {
			userId: decodedJWT.id,
			user: async () => { // This function retrieves the basic user information
				const user = await User.getById(decodedJWT.id);
				if (!user) return null;
				return User.getData(user).basicInfo;
			},
			permissions: await Role.getPermissions(decodedJWT.roles),
		};
	}

	/**
	 * Takes in an authentication object and serializes it for transport to the client.
	 * @param {Object} auth - The object that will be serialized.
	 * @return {Promise<Object>} The object that can be serialized.
	 */
	async serializeAuth(auth): Promise<ClientAuth> {
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
	 * @return {string}
	 */
	signJwt(payload = {}, options = {expiresIn: process.env.JWT_EXPIRES || '1h'}): string {
		const numBytes = Math.ceil(4);
		let bytes;
		try {
			bytes = randomBytes(numBytes);
		} catch (e) {
			bytes = pseudoRandomBytes(numBytes);
		}
		const rnd = bytes.toString('hex').substring(0, 4);

		return sign(Object.assign({}, {
			rnd,
		}, payload), process.env.JWT_SECRET, options);
	}

	/**
	 * Encrypts a password
	 * @param password
	 * @return {Promise<string>}
	 */
	async encryptPassword(password): Promise<string> {
		const pword = getPasswordString(password);
		return hash(pword, 10);
	}

	/**
	 * Takes a refresh token and creates a new access token
	 * @param {string} rtoken
	 */
	async refreshToken(rtoken: string): Promise<string> {
		const token = decode(rtoken);

		if (!token || !token.id || !token.exp) {
			throw TokenNotValid();
		} else if (Date.now() / 1000 > token.exp) {
			throw TokenExpired();
		} else {
			const {User} = this._ctx.models;
			const user = await User.getById(token.id);
			if (!user) throw UserNotFoundError();
			const {servicesField, roles} = User.getData(user);
			if (find(get(user, [servicesField, 'token', 'blacklist'], []), {token: token.rnd})) {
				throw TokenDeauthorized();
			} else {
				return this.signJwt({id: token.id, roles});
			}
		}
	}

	/**
	 * Attempts the log in process.
	 * @param {string} email - The email to log in with.
	 * @param {string|object} password - The password string/object to log in with.
	 * @return {Promise<{jwt: string, auth: {userId, permissions: void, user: {id, profile: {name: string, firstName: *, lastName: *}, emails: *}}}>}
	 */
	async logIn(email, password): Promise<LoginRet> {
		const attempts = await this._cache.get(`loginattempts:${email}`) || 0;
		d(`Starting log in process: ${email} (Attempt: ${attempts + 1})`);

		if (attempts > (process.env.LOGIN_MAX_FAIL || 5)) throw TooManyLoginAttempts();

		// Verify parameters
		const {User, Role} = this._ctx.models;

		if (!User) throw new Error('User model not defined');

		const user = await User.getByEmail(email);
		if (!user) throw UserNotFoundError();

		const {id, basicInfo, roles, servicesField} = User.getData(user);
		const userPassword = get(user, [servicesField, 'password', 'bcrypt']);

		if (userPassword) {
			if (await validatePassword(userPassword, password)) {
				d('Everything validated. Returning jwt, rtoken and auth');
				return {
					jwt: this.signJwt({id, roles}),
					rtoken: this.signJwt({id}, {expiresIn: process.env.RTOKEN_EXPIRES || '7d'}),
					auth: {
						userId: id,
						permissions: await Role.getPermissions(roles),
						user: basicInfo,
					},
				};
			}
		}

		d(`Incorrect password: ${email}`);
		await this._cache.set(`loginattempts:${email}`, attempts + 1, process.env.LOGIN_MAX_COOLDOWN || 300);
		throw IncorrectPasswordError();
	}

	async forgotPassword(email): Promise<boolean> {
		d(`Requesting forgotten password ${email}`);
		const {User} = this._ctx.models;

		// Get user
		const user = await User.getByEmail(email);
		// We return "success" here because we don't want to notify the client that we have a user with the specified email.
		if (!user) return true;

		// Get the previous recovery tokens
		const {servicesField} = User.getData(user);
		const recoveryTokens = get(user, [servicesField, 'token', 'recovery'], []);

		// Create a new recovery token
		const newToken = this.signJwt({recovery: randomId(32)}, {expiresIn: '2d'});
		set(user, [servicesField, 'token', 'recovery'], recoveryTokens.concat([newToken]));
		await user.save();

		return true;
	}

	async signUp(email): Promise<boolean> {
		d(email);
		return true;
	}
}
