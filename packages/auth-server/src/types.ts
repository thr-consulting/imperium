import type {Connector} from '@imperium/context-manager';
import type {ImperiumServerModule} from '@imperium/server';
import intersection from 'lodash/intersection';

export interface LoginInfo {
	identifier: string;
	password: {
		digest: string;
		algorithm: string;
	};
}

export function isLoginInfo(loginInfo: object): loginInfo is LoginInfo {
	return (
		(loginInfo as LoginInfo).identifier !== undefined &&
		(loginInfo as LoginInfo).password !== undefined &&
		(loginInfo as LoginInfo).password.algorithm !== undefined &&
		(loginInfo as LoginInfo).password.digest !== undefined
	);
}

export interface LoginReturn {
	id: string;
	access: string;
	refresh: string;
}

export interface ServiceInfo {
	id: string;
	roles: string[];
	password: {
		bcrypt: string;
	};
	blacklist?: number[];
}

export interface RefreshToken {
	id: string;
	type: string;
	iat: number;
	exp: number;
}

export function isRefreshToken(refreshToken: object): refreshToken is RefreshToken {
	return (
		(refreshToken as RefreshToken).id !== undefined && (refreshToken as RefreshToken).exp !== undefined && (refreshToken as RefreshToken).type === 'r'
	);
}

export interface AccessToken {
	id: string;
	roles?: string[];
	iat: string;
	exp: string;
}

export function isAccessToken(accessToken: object): accessToken is AccessToken {
	return (
		(accessToken as AccessToken).id !== undefined && (accessToken as AccessToken).iat !== undefined && (accessToken as AccessToken).exp !== undefined
	);
}

export interface ImperiumAuthServerModule<Context = any, Connectors extends Connector = any> extends ImperiumServerModule<Context, Connectors> {
	auth?: {
		getServiceInfo: (identifier: string) => Promise<ServiceInfo | null>;
	};
}

export interface AuthRequiredDomain {
	/**
	 * Gets user info for login use.
	 * @param identifier Unique email or username.
	 * @returns User password and roles, null if user does not exist.
	 */
	getServiceInfo(identifier: string): Promise<ServiceInfo | null>;
	getPermissions(roles: string[]): Promise<string[]>;
	/**
	 * Sets a cache value.
	 * @param key unique identifier for cache
	 * @param value boolean value
	 * @param expire time in seconds before this entry expires.
	 */
	setCache(key: string | string[], value: any, expire?: number): Promise<typeof value>;
	getCache(key: string | string[]): Promise<any>;
	invalidateCache(key: string | string[] | undefined): Promise<void>;
}

export interface AuthContext {
	id: null | number | string;
	permissions: null | string[];
	hasPermission(need: string[]): boolean;
	getCache(key: string): ReturnType<AuthRequiredDomain['getCache']>;
	setCache(key: string, allowed: boolean, expire?: number): ReturnType<AuthRequiredDomain['setCache']>;
	invalidateCache(key: string): ReturnType<AuthRequiredDomain['invalidateCache']>;
}
