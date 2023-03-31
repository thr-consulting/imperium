import type {AccessToken, AuthorizationInfo, LoginInfo, LogoutInfo, RefreshToken} from '../types';

/**
 * Typeguard to check if an object is login info.
 * @param loginInfo
 */
export function isLoginInfo(loginInfo: any): loginInfo is LoginInfo {
	const a = loginInfo as LoginInfo;
	if (a.identifier !== undefined && a.password !== undefined && a.password.algorithm !== undefined && a.password.digest !== undefined) {
		if (a.device) {
			return !!a.device.uniqueId;
		}
		return true;
	}
	return false;
}

export function isLogoutInfo(logoutInfo: any): logoutInfo is LogoutInfo {
	return (logoutInfo as LogoutInfo).id !== undefined;
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
	const a = info as AuthorizationInfo;
	return !!a.permissions && Array.isArray(a.permissions);
}
