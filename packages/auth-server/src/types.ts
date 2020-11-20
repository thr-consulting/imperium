export interface LoginInfo {
	identifier: string;
	password: {
		digest: string;
		algorithm: string;
	};
	rememberDevice?: boolean;
}

export interface LoginReturn {
	id: string;
	access: string;
	refresh: string;
}

export interface RefreshToken {
	id: string;
	type: string;
	iat: number;
	exp: number;
}

export interface AccessToken {
	id: string;
	iat: string;
	exp: string;
}

export interface ServiceInfo {
	id: string;
	password?: string; // Bcrypt hash password
	blacklist?: string[]; // Blacklisted refresh tokens
}

export interface AuthenticationDomain {
	getServiceInfo(id: string): Promise<ServiceInfo | null>;
	setCache(key: string | string[], value: any, expire?: number): Promise<typeof value>;
	getCache(key: string | string[]): Promise<any>;
	invalidateCache(key: string | string[]): Promise<void>;
}

export type GetAuthenticationFn = (context: any) => AuthenticationDomain;

export interface AuthMiddlewareConfig {
	credentialsRequired?: boolean;
	authQueryToken?: boolean;
}
