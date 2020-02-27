/* eslint-disable import/no-cycle */
// see: https://github.com/babel/babel/issues/10981
import sha256 from '@thx/sha256';
import {compare, hash} from 'bcrypt';
import debug from 'debug';
import {Request} from 'express';
import {decode, sign, SignOptions} from 'jsonwebtoken';
import {isRefreshToken, LoginInfo, LoginReturn, RefreshInfo, ServiceInfo, AuthContextManager, ImperiumAuthServerModule} from '../types';

const d = debug('imperium.auth-server.Auth');

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

export class Auth {
	static validatePassword(serviceInfo: ServiceInfo, loginInfo: LoginInfo): Promise<boolean> {
		return compare(getPasswordString(loginInfo.password), serviceInfo.password.bcrypt);
	}

	static createAccessToken(serviceInfo: ServiceInfo, ctx: AuthContextManager): string {
		return signJwt(
			{
				id: serviceInfo.id,
				roles: serviceInfo.roles,
			},
			ctx.server.environment.authAccessTokenSecret as string,
			{expiresIn: ctx.server.environment.authAccessTokenExpires as string},
		);
	}

	static createRefreshToken(identifier: string, ctx: AuthContextManager): string {
		return signJwt(
			{
				id: identifier,
				type: 'r',
			},
			ctx.server.environment.authRefreshTokenSecret as string,
			{expiresIn: ctx.server.environment.authRefreshTokenExpires as string},
		);
	}

	static async login(loginInfo: LoginInfo, authModule: ImperiumAuthServerModule, req: Request, ctx: AuthContextManager): Promise<LoginReturn> {
		// 1. Check attempts
		const cacheConnectorKey = ctx.server.environment.authSharedCacheConnectorKey as string;
		const attemptKey = `loginattempts:${loginInfo.identifier}_${req.connection.remoteAddress?.replace(/:/g, ';')}`;
		const attempts = (await ctx.server.connectors[cacheConnectorKey].get(attemptKey)) || 0;
		if (attempts > ctx.server.environment.authMaxFail) throw new Error('Too many login attempts');

		// 2. Get service info from domain layer
		const serviceInfo = await authModule.auth?.getServiceInfo(loginInfo.identifier, ctx);
		if (!serviceInfo) {
			throw new Error('User not found');
		} else {
			// 3. Validate password
			if (await Auth.validatePassword(serviceInfo, loginInfo)) {
				// 4. Create and return access and refresh tokens
				return {
					id: serviceInfo.id,
					access: Auth.createAccessToken(serviceInfo, ctx),
					refresh: Auth.createRefreshToken(loginInfo.identifier, ctx),
				};
			}
			// 5. Update cache with attempts and return error on non-valid password.
			await ctx.server.connectors[cacheConnectorKey].set(attemptKey, attempts + 1, ctx.server.environment.authMaxCooldown);
			throw new Error('Invalid password');
		}
	}

	static async refresh(refreshInfo: RefreshInfo, authModule: ImperiumAuthServerModule, req: Request, ctx: AuthContextManager) {
		// Todo this should probably read cookies because you can brute force this
		const token = decode(refreshInfo.refresh);

		// Check if token is invalid or expired
		if (!token || typeof token === 'string' || !isRefreshToken(token)) {
			throw new Error('Token not valid');
		} else if (Date.now() / 1000 > token.exp) {
			throw new Error('Token expired');
		}

		// Get service info from domain layer
		const serviceInfo = await authModule.auth?.getServiceInfo(token.id, ctx);
		if (!serviceInfo) {
			throw new Error('User not found');
		}

		// Check if token is blacklisted
		const blacklistIndex = serviceInfo.blacklist?.indexOf(token.iat);
		if (typeof blacklistIndex === 'number' && blacklistIndex >= 0) {
			throw new Error('Token is blacklisted');
		}

		return {
			access: Auth.createAccessToken(serviceInfo, ctx),
		};
	}

	static async getCache(key: string | string[], ctx: AuthContextManager): Promise<boolean | null> {
		const cacheConnectorKey = ctx.server.environment.authSharedCacheConnectorKey as string;
		const keyString = key instanceof Array ? key.join('_') : key;
		return ctx.server.connectors[cacheConnectorKey].get(`auth:cache:${keyString}`);
	}

	static async setCache(key: string | string[], allowed = true, ctx: AuthContextManager, expire = 86400) {
		const cacheConnectorKey = ctx.server.environment.authSharedCacheConnectorKey as string;
		const keyString = key instanceof Array ? key.join('_') : key;
		await ctx.server.connectors[cacheConnectorKey].set(`auth:cache:${keyString}`, allowed, expire);
		// can be used to immediately use the value after setting the cache
		return allowed;
	}

	static async invalidateCache(key: string | string[], ctx: AuthContextManager): Promise<void> {
		const cacheConnectorKey = ctx.server.environment.authSharedCacheConnectorKey as string;
		const keyString = key instanceof Array ? key.join('_') : key;
		await ctx.server.connectors[cacheConnectorKey].del(`auth:cache:${keyString}`);
	}
}

export function AuthContext() {
	return {
		Auth,
	};
}
