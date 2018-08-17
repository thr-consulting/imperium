/* eslint-disable no-underscore-dangle */
import debug from 'debug';
import {compare, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import MongoLoader from '@thx/mongoloader';
import {Map} from 'immutable';
import randomId from './randomId';
import sha256 from './sha256';
import {
	userNotFoundError,
	incorrectPasswordError,
} from './errors';

const d = debug('imperium.auth.server.Auth');

/**
 * Takes in a string or password object and returns the password object. Enforces sha-256 algorithm.
 * @param password
 * @return {*}
 */
function getPasswordString(password) {
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
 * Validates a user object and a password object
 * @param user
 * @param password
 * @return {Promise<*>}
 */
async function validatePassword(user, password) {
	const pword = getPasswordString(password);
	return compare(pword, user.services.password.bcrypt);
}

/**
 * Creates a signed JWT from user data
 * @param user
 * @param payload
 * @param options
 * @return {*}
 */
function signJwt(user, payload = {}, options = {expiresIn: process.env.JWT_EXPIRES || '7d'}) {
	return sign(Object.assign({}, {
		id: user._id,
		rnd: randomId(8),
		roles: user.roles,
	}, payload), process.env.JWT_SECRET, options);
}

export default class Auth extends MongoLoader {
	constructor(connection, ctx) {
		super(connection, ctx, 'roles');
		this.createIndex('name', {unique: true});
		this.createLoader('name');
	}

	/**
	 * Returns a default authentication object (for server)
	 * @return {Map}
	 */
	defaultAuth() {
		return new Map({
			userId: null,
			user: () => null,
			permissions: [],
		});
	}

	/**
	 * Builds an authentication object from a decoded JWT
	 * @param decodedJWT
	 * @return {Promise<Map>}
	 */
	buildAuthFromJwt = async decodedJWT => {
		const authModel = this;
		return new Map({
			userId: decodedJWT.id,
			user: async () => { // This function retrieves the basic user information
				const user = await authModel.models.Users.getById(decodedJWT.id);
				if (!user) return authModel.defaultAuth();
				return authModel.models.Users.getBasicInfo(user);
			},
			permissions: await this.getPermissions(decodedJWT.roles),
		});
	};

	/**
	 * Takes in an authentication object and serializes it for transport to the client
	 * @param auth
	 * @return {Promise<void>}
	 */
	async serializeAuth(auth) {
		const user = await auth.get('user')();
		return new Map({
			userId: auth.get('userId'),
			permissions: auth.get('permissions'),
			user,
		});
	}

	/**
	 * Attempts the sign in process.
	 * @param email
	 * @param password
	 * @returns {Promise.<{jwt, auth: {userId, permissions: void, user: {id, profile: {name: string, firstName: (*|string), lastName: (*|string)}, emails: (*|number|Array)}}}>}
	 */
	async signIn(email, password) {
		d('Starting sign in process');

		// Verify parameters
		const {Users} = this.models;

		const user = await Users.getByEmail(email);
		if (!user) throw userNotFoundError();

		if (user.services && user.services.password && user.services.password.bcrypt) {
			if (await validatePassword(user, password)) {
				return {
					jwt: signJwt(user),
					auth: {
						userId: user._id,
						permissions: await this.getPermissions(user.roles),
						user: {
							id: user._id,
							profile: {
								name: `${user.profile.firstName} ${user.profile.lastName}`.trim(),
								firstName: user.profile.firstName,
								lastName: user.profile.lastName,
							},
							emails: user.emails,
						},
					},
				};
			}
		}
		d(`Incorrect password: ${email}`);
		throw incorrectPasswordError();
	}

	/**
	 * Generate a JWT for the currently logged in user.
	 * @param payload - Optional JWT claims
	 * @param options - Optional JWT options
	 * @returns {Promise.<void>}
	 */
	async generateJwt(payload, options) {
		const user = await this.ctx.auth.get('user')();
		if (!user) return null;
		return signJwt(user, payload, options);
	}

	/**
	 * Encrypts a password
	 * @param password
	 * @returns {Promise.<void>}
	 */
	async encryptPassword(password) {
		const pword = getPasswordString(password);
		return hash(pword, 10);
	}

	/**
	 * Gets the array of permissions from an array of roles
	 * @param roles
	 * @returns {Promise.<void>}
	 */
	async getPermissions(roles = []) {
		const perms = await this.loadMany(roles, 'name');
		return perms.reduce((memo, value) => [...memo, ...value.permissions], []);
	}

	/**
	 * Create a new role
	 * @param name
	 * @param permissions
	 * @returns {Promise<>}
	 */
	createRole(name, permissions) {
		return this.insertOne(this.prime({
			_id: randomId(),
			name,
			permissions,
		}));
	}

	/**
	 * Gets a role by name
	 * @param name
	 */
	getByName(name) {
		return this.load(name, 'name');
	}
}
