import {AuthContextManager} from './serverTypes';

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

export interface RefreshInfo {
	refresh: string;
}

export function isRefreshInfo(refreshInfo: object): refreshInfo is RefreshInfo {
	return (refreshInfo as RefreshInfo).refresh !== undefined;
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
		(refreshToken as RefreshToken).id !== undefined &&
		(refreshToken as RefreshToken).exp !== undefined &&
		(refreshToken as RefreshToken).type === 'r'
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
		(accessToken as AccessToken).id !== undefined &&
		(accessToken as AccessToken).iat !== undefined &&
		(accessToken as AccessToken).exp !== undefined
	);
}

export interface ImperiumAuthServerModule {
	auth?: {
		getServiceInfo: (identifier: string, ctx: AuthContextManager) => ServiceInfo;
	};
}
