import type {AccessToken, AuthorizationInfo, LoginInfo, LogoutInfo, RefreshToken} from '../types';

/**
 * Typeguard to check if an object is login info.
 * @param loginInfo
 */
export function isLoginInfo(loginInfo: any): loginInfo is LoginInfo {
	const a = loginInfo as LoginInfo | undefined;
	if (a?.identifier !== undefined && a.password !== undefined && a.password.algorithm !== undefined && a.password.digest !== undefined) {
		if (a.device) {
			return !!a.device.uniqueId;
		}
		return true;
	}
	return false;
}

export function isLogoutInfo(logoutInfo: any): logoutInfo is LogoutInfo {
	return true;
}

export function isRefreshToken(refreshToken: any): refreshToken is RefreshToken {
	return (
		(refreshToken as RefreshToken | undefined)?.id !== undefined &&
		(refreshToken as RefreshToken | undefined)?.exp !== undefined &&
		(refreshToken as RefreshToken).type === 'r'
	);
}

export function isAccessToken(accessToken: any): accessToken is AccessToken {
	return (
		(accessToken as AccessToken | undefined)?.id !== undefined &&
		(accessToken as AccessToken | undefined)?.iat !== undefined &&
		(accessToken as AccessToken | undefined)?.exp !== undefined
	);
}

export function isAuthorizationInfo(info: any): info is AuthorizationInfo {
	const a = info as AuthorizationInfo | undefined;
	return !!a?.permissions && Array.isArray(a.permissions);
}
