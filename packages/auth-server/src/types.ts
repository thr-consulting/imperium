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

// Used in endpoints
export interface AuthRequiredDomain<C = any> {
	/**
	 * Gets user info for login use.
	 * @param identifier Unique email or username.
	 * @returns User password and roles, null if user does not exist.
	 */
	getServiceInfo(identifier: string, context: C): Promise<ServiceInfo | null>;
	getPermissions(roles: string[], context: C): Promise<string[]>;
	/**
	 * Sets a cache value.
	 * @param value
	 * @param value.key unique identifier for cache
	 * @param value.value boolean value
	 * @param value.expire time in seconds before this entry expires.
	 * @param context
	 */
	setCache(value: {key: string | string | string[]; value: any; expire?: number}, context: C): Promise<typeof value>;
	getCache(key: string | string[], context: C): Promise<any>;
	invalidateCache(key: string | string[] | undefined, context: C): Promise<void>;
}

export interface AuthMiddlewareConfig {
	credentialsRequired?: boolean;
}
