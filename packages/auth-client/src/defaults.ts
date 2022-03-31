export const defaults = {
	AUTH_PERMISSION_CACHE_EXPIRES: 3600, // seconds
	authAccessTokenKey: 'access', // Key used to store access token on web/app
	authIdKey: 'id', // Key used to store authentication id on web/app
	authRefreshUrl: 'http://localhost:4001/api/refresh', // URL to refresh API
	authLoginUrl: 'http://localhost:4001/api/login', // URL to login API
	authPermissionUrl: 'http://localhost:4001/api/auth', // URL to permission API
	authForgotPasswordUrl: 'http://localhost:4001/api/forgot-password', // URL to password refresh API
};
