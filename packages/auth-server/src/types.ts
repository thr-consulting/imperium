export interface Password {
	digest: string;
	algorithm: string;
}

export interface LoginInfo {
	identifier: string;
	password: Password;
	rememberDevice?: boolean;
}

export interface LoginReturn {
	id: string;
	access: string;
	refresh: string;
}

export interface RefreshToken {
	id: string; // identifier, not id
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
}

export interface AuthenticationDomain {
	// getServiceInfo(id: string): Promise<ServiceInfo | null>;
	setCache(key: string | string[], value: any, expire?: number): Promise<typeof value>;
	getCache(key: string | string[]): Promise<any>;
	invalidateCache(key: string | string[]): Promise<void>;
	verifyLogin(loginInfo: LoginInfo): Promise<string>;
	verifyRefresh(token: RefreshToken): Promise<void>;
}

export type GetAuthenticationFn = (context: any) => AuthenticationDomain;

export interface AuthMiddlewareConfig {
	credentialsRequired?: boolean;
	authQueryToken?: boolean;
}

export interface AuthorizationInfo {
	permissions: string[];
}
