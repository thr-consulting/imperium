import sha256 from '@thx/sha256';
import {compare, hash} from 'bcrypt';
import debug from 'debug';
import {decode, sign, SignOptions} from 'jsonwebtoken';
import {environment} from '../environment';
import type {AuthRequiredDomain, LoginInfo, LoginReturn, ServiceInfo} from '../types';
import {isRefreshToken} from './typeguards';

const d = debug('imperium.auth-server.lib');
const env = environment();

function getPasswordString(password: string | {algorithm: string; digest: string}): string {
	if (typeof password === 'string') {
		return sha256(password).toLowerCase();
	}

	if (password.algorithm.toLowerCase() !== 'sha-256') {
		throw new Error('Invalid Hash Algorithm');
	}
	return password.digest.toLowerCase();
}

function encryptPassword(password: string, saltOrRounds: string | number = 10): Promise<string> {
	return hash(getPasswordString(password), saltOrRounds);
}

function signJwt(payload: string | object = {}, secret: string, options: SignOptions = {expiresIn: '1h'}): string {
	return sign(payload, secret, options);
}

export function validatePassword(serviceInfo: ServiceInfo, loginInfo: LoginInfo): Promise<boolean> {
	return compare(getPasswordString(loginInfo.password), serviceInfo.password.bcrypt);
}

export function createAccessToken(serviceInfo: ServiceInfo): string {
	return signJwt(
		{
			id: serviceInfo.id,
			roles: serviceInfo.roles,
		},
		env.authAccessTokenSecret,
		{expiresIn: env.authAccessTokenExpires},
	);
}

export function createRefreshToken(identifier: string): string {
	return signJwt(
		{
			id: identifier,
			type: 'r',
		},
		env.authRefreshTokenSecret as string,
		{expiresIn: env.authRefreshTokenExpires as string},
	);
}

export async function login(
	loginInfo: LoginInfo,
	remoteAddress: string | undefined,
	authOptions: AuthRequiredDomain,
	context: any,
): Promise<LoginReturn> {
	// 1. Check attempts
	const attemptKey = `loginattempts:${loginInfo.identifier}_${remoteAddress?.replace(/:/g, ';')}`;
	const attempts = (await authOptions.getCache(attemptKey, context)) || 0;
	if (attempts > env.authMaxFail) throw new Error('Too many login attempts');

	// 2. Get service info from domain layer
	const serviceInfo = await authOptions.getServiceInfo(loginInfo.identifier, context);
	if (!serviceInfo) {
		throw new Error('User not found');
	} else {
		// 3. Validate password
		if (await validatePassword(serviceInfo, loginInfo)) {
			// 4. Create and return access and refresh tokens
			return {
				id: serviceInfo.id,
				access: createAccessToken(serviceInfo),
				refresh: createRefreshToken(loginInfo.identifier),
			};
		}
		// 5. Update cache with attempts and return error on non-valid password.
		await authOptions.setCache(
			{
				key: attemptKey,
				value: attempts + 1,
				expire: env.authMaxCooldown,
			},
			context,
		);
		throw new Error('Invalid password');
	}
}

export async function refresh(refreshTokenString: string, options: AuthRequiredDomain, context: any) {
	// Todo this should probably read cookies because you can brute force this
	const token = decode(refreshTokenString);

	// Check if token is invalid or expired
	if (!token || typeof token === 'string' || !isRefreshToken(token)) {
		throw new Error('Token not valid');
	} else if (Date.now() / 1000 > token.exp) {
		throw new Error('Token expired');
	}

	// Get service info from domain layer
	const serviceInfo = await options.getServiceInfo(token.id, context);
	if (!serviceInfo) {
		throw new Error('User not found');
	}

	// Check if token is blacklisted
	const blacklistIndex = serviceInfo.blacklist?.indexOf(token.iat);
	if (typeof blacklistIndex === 'number' && blacklistIndex >= 0) {
		throw new Error('Token is blacklisted');
	}

	return {
		// Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file. <= thats a yikes from me
		access: createAccessToken(serviceInfo),
	};
}
