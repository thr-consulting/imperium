import sha256 from '@thx/sha256';
import {compare, hash} from 'bcrypt';
import debug from 'debug';
import {decode, sign, SignOptions} from 'jsonwebtoken';
import {environment} from '../environment';
import type {AuthenticationDomain, LoginInfo, LoginReturn, ServiceInfo} from '../types';
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

export function encryptPassword(password: string | {algorithm: string; digest: string}, saltOrRounds: string | number = 10): Promise<string> {
	return hash(getPasswordString(password), saltOrRounds);
}

function signJwt(payload: string | Record<string, unknown> = {}, secret: string, options: SignOptions = {expiresIn: '1h'}): string {
	return sign(payload, secret, options);
}

export function signPayload(payload: string | Record<string, unknown> = {}): string {
	return signJwt(payload, env.authAccessTokenSecret, {expiresIn: env.authAccessTokenExpires});
}

export async function validatePassword(serviceInfo: ServiceInfo, loginInfo: LoginInfo): Promise<boolean> {
	return compare(getPasswordString(loginInfo.password), serviceInfo.password || '');
}

export function createAccessToken(serviceInfo: ServiceInfo): string {
	return signJwt(
		{
			id: serviceInfo.id,
		},
		env.authAccessTokenSecret,
		{expiresIn: env.authAccessTokenExpires},
	);
}

export function createRefreshToken(identifier: string, rememberDevice?: boolean): string {
	return signJwt(
		{
			id: identifier,
			type: 'r',
		},
		env.authRefreshTokenSecret as string,
		{expiresIn: rememberDevice ? env.authRefreshTokenExpiresLong : env.authRefreshTokenExpiresShort},
	);
}

export async function login(loginInfo: LoginInfo, remoteAddress: string | undefined, auth: AuthenticationDomain): Promise<LoginReturn> {
	// 1. Check attempts
	const attemptKey = `loginattempts:${loginInfo.identifier}_${remoteAddress?.replace(/:/g, ';')}`;
	const attempts = (await auth.getCache(attemptKey)) || 0;
	if (attempts > env.authMaxFail) throw new Error('Too many login attempts');

	// 2. Get service info from domain layer
	const serviceInfo = await auth.getServiceInfo(loginInfo.identifier);
	if (!serviceInfo) {
		throw new Error('User not found');
	} else {
		// 3. Validate password
		if (await validatePassword(serviceInfo, loginInfo)) {
			// 4. Create and return access and refresh tokens
			return {
				id: serviceInfo.id,
				access: createAccessToken(serviceInfo),
				refresh: createRefreshToken(loginInfo.identifier, loginInfo.rememberDevice),
			};
		}
		// 5. Update cache with attempts and return error on non-valid password.
		await auth.setCache(attemptKey, attempts + 1, env.authMaxCooldown);
		throw new Error('Invalid password');
	}
}

export async function refresh(refreshTokenString: string, auth: AuthenticationDomain): Promise<{access: string}> {
	const token = decode(refreshTokenString);

	// Check if token is invalid or expired
	if (!token || typeof token === 'string' || !isRefreshToken(token)) {
		throw new Error('Token not valid');
	} else if (Date.now() / 1000 > token.exp) {
		throw new Error('Token expired');
	}

	// Get service info from domain layer
	const serviceInfo = await auth.getServiceInfo(token.id);
	if (!serviceInfo) {
		throw new Error('User not found');
	}

	// Check if token is blacklisted
	const blacklistIndex = serviceInfo.blacklist?.indexOf(refreshTokenString);
	if (typeof blacklistIndex === 'number' && blacklistIndex >= 0) {
		throw new Error('Token is blacklisted');
	}

	return {
		// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
		access: createAccessToken(serviceInfo),
	};
}
