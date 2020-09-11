import memoize from 'lodash/memoize';

export const environment = memoize((env?: Record<string, unknown>) => {
	return {
		localStorageAccessTokenKey: (env?.authAccessTokenKey as string) || 'access',
		localStorageIdKey: (env?.authIdKey as string) || 'id',
		refreshUrl: (env?.authRefreshUrl as string) || 'http://localhost:4001/api/refresh',
		loginUrl: (env?.authLoginUrl as string) || 'http://localhost:4001/api/login',
		forgotPasswordUrl: (env?.authForgotPasswordUrl as string) || 'http://localhost:4001/api/forgot-password',
	};
});
