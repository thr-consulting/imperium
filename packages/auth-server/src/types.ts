export interface Password {
	digest: string;
	algorithm: string;
}

export interface LoginInfo {
	identifier: string;
	password: Password;
	rememberDevice?: boolean;
	device?: {
		uniqueId: string;
	};
}

interface CustomData {
	[key: string]: string | number | boolean | null;
}

export interface LoginReturn {
	id: string;
	access: string;
	refresh: string;
	data?: CustomData;
}

export interface RefreshReturn {
	access: string;
	refresh?: string;
	data?: CustomData;
}

export interface LogoutInfo {
	device?: {
		uniqueId: string;
	};
}
export interface RefreshToken {
	id: string; // identifier, not id
	type: string;
	iat: number;
	exp: number;
	dev?: string;
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

export interface VerifyLoginReturn {
	id: string;
	deviceToken?: string;
	data?: CustomData;
}

export interface VerifyRefreshReturn {
	id: string;
	data?: CustomData;
}

export interface AuthenticationDomain {
	setCache(key: string | string[], value: any, expire?: number): Promise<typeof value>;
	getCache(key: string | string[]): Promise<any>;
	invalidateCache(key: string | string[]): Promise<void>;
	verifyLogin(loginInfo: LoginInfo): Promise<VerifyLoginReturn>;
	verifyRefresh(token: RefreshToken, isExpired: boolean): Promise<VerifyRefreshReturn>;
	onLogout?(id: string, logoutInfo: LogoutInfo): Promise<void>;
}

export type GetAuthenticationFn = (context: any) => AuthenticationDomain;

export interface AuthMiddlewareConfig {
	credentialsRequired?: boolean;
	authQueryToken?: boolean;
}

export interface AuthorizationInfo {
	permissions: string[];
}
