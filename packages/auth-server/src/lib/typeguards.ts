import type {AccessToken, AuthorizationInfo, LoginInfo, RefreshToken} from '../types';

/**
 * Typeguard to check if an object is login info.
 * @param loginInfo
 */
export function isLoginInfo(loginInfo: any): loginInfo is LoginInfo {
	return (
		(loginInfo as LoginInfo).identifier !== undefined &&
		(loginInfo as LoginInfo).password !== undefined &&
		(loginInfo as LoginInfo).password.algorithm !== undefined &&
		(loginInfo as LoginInfo).password.digest !== undefined
	);
}

export function isRefreshToken(refreshToken: any): refreshToken is RefreshToken {
	return (
		(refreshToken as RefreshToken).id !== undefined && (refreshToken as RefreshToken).exp !== undefined && (refreshToken as RefreshToken).type === 'r'
	);
}

export function isAccessToken(accessToken: any): accessToken is AccessToken {
	return (
		(accessToken as AccessToken).id !== undefined && (accessToken as AccessToken).iat !== undefined && (accessToken as AccessToken).exp !== undefined
	);
}

export function isAuthorizationInfo(info: any): info is AuthorizationInfo {
	return !!(info as AuthorizationInfo).permission;
}
