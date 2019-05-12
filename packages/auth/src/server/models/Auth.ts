import debug from 'debug';
import {compare, hash} from 'bcrypt';
import {pseudoRandomBytes, randomBytes} from 'crypto';
import {sign} from 'jsonwebtoken';
import {ContextMap} from '@imperium/core';
import {ServerAuth, ClientAuth, LoginRet} from '../../types';
import {incorrectPasswordError, userNotFoundError} from './errors';
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
			throw new Error('Invalid password hash algorithm. Only \'sha-256\' is allowed.');
		}
		pword = pword.digest;
	}
	return pword;
}

/**
 * Validates a user object and a password string/object.
 * @param bcrypt - Encrypted password
 * @param password
 * @return {Promise<boolean>}
 */
export async function validatePassword(bcrypt, password): Promise<boolean> {
	const pword = getPasswordString(password);
	return compare(pword, bcrypt);
}

/**
 * Creates a signed JWT from user data.
 * @private
 * @param user
 * @param payload
 * @param options
 * @return {string}
 */
function signJwt(payload = {}, options = {expiresIn: process.env.JWT_EXPIRES || '7d'}): string {
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
 * Model class for authentication. Uses a Mongo `roles` collection and has an opinionated user object.
 */
export default class Auth {
	_ctx: ContextMap;

	constructor(ctx) {
		this._ctx = ctx;
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
	 * Generate a JWT for the currently logged in user.
	 * @param payload - Optional JWT claims
	 * @param options - Optional JWT options
	 * @return {Promise.<void>}
	 */
	async generateJwt(payload, options): Promise<string | null> {
		if (!this._ctx.auth) throw new Error('auth isn\'t set on context');
		const user = await this._ctx.auth.user();
		if (!user) return null;
		const {id, roles} = this._ctx.models.User.getData(user);
		return signJwt({
			...payload,
			id,
			roles,
		}, options);
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
	 * Attempts the log in process.
	 * @param {string} email - The email to log in with.
	 * @param {string|object} password - The password string/object to log in with.
	 * @return {Promise<{jwt: string, auth: {userId, permissions: void, user: {id, profile: {name: string, firstName: *, lastName: *}, emails: *}}}>}
	 */
	async logIn(email, password): Promise<LoginRet> {
		d(`Starting log in process: ${email}`);

		// Verify parameters
		const {User, Role} = this._ctx.models;

		if (!User) throw new Error('User model not defined');

		const user = await User.getByEmail(email);
		if (!user) throw userNotFoundError();

		const {id, basicInfo, password: userPassword, roles} = User.getData(user);

		if (userPassword) {
			if (await validatePassword(userPassword, password)) {
				d('Everything validated. Returning jwt and auth');
				return {
					jwt: signJwt({id, roles}),
					auth: {
						userId: id,
						permissions: await Role.getPermissions(roles),
						user: basicInfo,
					},
				};
			}
		}
		d(`Incorrect password: ${email}`);
		throw incorrectPasswordError();
	}
}
