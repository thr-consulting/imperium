export const defaults = {
	IMP_AUTH_DOMAIN: 'localhost', // Which domain is the auth server running on. Used for cookies.
	IMP_LOGIN_URL: '/api/login', // URL for REST login
	IMP_LOGIN_APP_URL: '/api/app/login', // URL for REST login for apps
	IMP_REFRESH_URL: '/api/refresh', // URL for REST refresh access token
	IMP_RESET_URL: '/api/forgot-password', // URL to request password reset
	IMP_PERMISSION_URL: '/api/auth', // URL to permission API
	IMP_ACCESS_TOKEN_SECRET: 'notsecure', // Secret for access tokens
	IMP_TOKEN_ALGORITHMS: 'HS256', // Comma separated list of supported access token algorithms
	IMP_REFRESH_TOKEN_SECRET: 'notsecure', // Secret for refresh tokens
	IMP_ACCESS_TOKEN_EXPIRES: '5m', // How often an access token expires
	IMP_REFRESH_TOKEN_EXPIRES_SHORT: '1d', // How often a short refresh token expires
	IMP_REFRESH_TOKEN_EXPIRES_LONG: '7d', // How often a long refresh token expires
	IMP_LOGIN_MAX_FAIL: 5, // How many failed login attempts allowed before requiring cool down
	IMP_REFRESH_COOKIE_NAME: 'refresh',
	IMP_LOGIN_MAX_COOLDOWN: 300, // How many seconds to lock failed login attempts out
	// CORS_ORIGIN: '', // No default
};
