import debug from 'debug';
import {compare, hash} from 'bcrypt';
import {pseudoRandomBytes, randomBytes} from 'crypto';
import {sign, decode} from 'jsonwebtoken';
import get from 'lodash/get';
import {Context, ImperiumOptions, ModelsOptions} from '@imperium/server';
// @ts-ignore
import {randomId, SharedCache, sha256} from '@thx/extras/server';
import {ServerAuth, ClientAuth, LoginRet} from '../types';
import {
	IncorrectPasswordError,
	InvalidHashAlgorithm,
	TokenDeauthorized,
	TokenExpired,
	TokenNotValid,
	TooManyLoginAttempts,
	UserNotFoundError,
} from './errors';

const d = debug('imperium.auth-server.Auth');

interface ServicesField {
	password: {
		bcrypt: string;
	};
	token: {
		recovery: string[];
		blacklist: {
			token: {
				rnd: string;
			};
		}[];
	};
}

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
	/**
	 * Returns a default (blank) authentication object
	 */
	static defaultAuth(): ServerAuth {
		return {
			userId: null,
			user: async () => null,
			permissions: [],
		};
	}
}
