import type {AuthContext} from '@imperium/context-manager';

export interface LoginInfo {
	identifier: string;
	password: {
		digest: string;
		algorithm: string;
	};
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
	blacklist?: number[]; // Blacklisted refresh tokens
}

export interface RefreshToken {
	id: string;
	type: string;
	iat: number;
	exp: number;
}

export interface AccessToken {
	id: string;
	roles?: string[];
	iat: string;
	exp: string;
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

export interface ApolloContext {
	auth: AuthContext;
}

export interface AuthMiddlewareConfig {
	requiredDomain: AuthRequiredDomain;
	credentialsRequired?: boolean;
}
