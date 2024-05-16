type ExcludeDataField<T> = {
	[K in keyof T]?: K extends 'data' ? never : T[K];
};

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

interface LoginReturnData {
	id: string;
	access: string;
	refresh: string;
	customData?: CustomData;
}
export type LoginReturn = LoginReturnData & ExcludeDataField<LoginReturnData>;

interface RefreshReturnData {
	access: string;
	refresh?: string;
	customData?: CustomData;
}
export type RefreshReturn = RefreshReturnData & ExcludeDataField<RefreshReturnData>;

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

interface VerifyLoginReturnData {
	id: string;
	deviceToken?: string;
	customData?: CustomData;
}
export type VerifyLoginReturn = VerifyLoginReturnData & ExcludeDataField<VerifyLoginReturnData>;

interface VerifyRefreshReturnData {
	id: string;
	customData?: CustomData;
}
export type VerifyRefreshReturn = VerifyRefreshReturnData & ExcludeDataField<VerifyRefreshReturnData>;

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
