import type {AccessToken, LoginInfo, RefreshToken} from '../types';

/**
 * Typeguard to check if an object is login info.
 * @param loginInfo
 */
export function isLoginInfo(loginInfo: unknown): loginInfo is LoginInfo {
	return (
		(loginInfo as LoginInfo).identifier !== undefined &&
		(loginInfo as LoginInfo).password !== undefined &&
		(loginInfo as LoginInfo).password.algorithm !== undefined &&
		(loginInfo as LoginInfo).password.digest !== undefined
	);
}

export function isRefreshToken(refreshToken: unknown): refreshToken is RefreshToken {
	return (
		(refreshToken as RefreshToken).id !== undefined && (refreshToken as RefreshToken).exp !== undefined && (refreshToken as RefreshToken).type === 'r'
	);
}

export function isAccessToken(accessToken: unknown): accessToken is AccessToken {
	return (
		(accessToken as AccessToken).id !== undefined && (accessToken as AccessToken).iat !== undefined && (accessToken as AccessToken).exp !== undefined
	);
}
