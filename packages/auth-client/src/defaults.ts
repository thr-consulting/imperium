export const defaults = {
	IMP_PERMISSION_CACHE_EXPIRES: 3600, // seconds
	IMP_API_URL: 'http://localhost:4001',
	authAccessTokenKey: 'access', // Key used to store access token on web/app
	authIdKey: 'id', // Key used to store authentication id on web/app
	authRefreshUrl: '/api/refresh', // URL to refresh API
	authLoginUrl: '/api/login', // URL to login API
	authLogoutUrl: '/api/logout', // URL to logout API
	authForgotPasswordUrl: '/api/forgot-password', // URL to password refresh API
	authPermissionUrl: '/api/auth', // URL to permission API
};
