import memoize from 'lodash/memoize';

export const environment = memoize(() => ({
	authServerDomain: process.env.AUTH_SERVER_DOMAIN || 'localhost', // Which domain is the auth server running on. Used for cookies.
	authLoginUrl: process.env.AUTH_LOGIN_URL || '/api/login', // URL for REST login
	authRefreshUrl: process.env.AUTH_REFRESH_URL || '/api/refresh', // URL for REST refresh access token
	authForgotPasswordUrl: process.env.AUTH_FORGOTPASSWORD_URL || '/api/forgot-password', // URL to request password reset
	authAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure', // Secret for access tokens
	authAccessTokenAlgorithms: process.env.ACCESS_TOKEN_ALGORITHMS?.split(',').map(s => s.trim()) || ['HS256'], // Algorithms allowed
	authRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'notsecure', // Secret for refresh tokens
	authAccessTokenExpires: process.env.AUTH_ACCESS_TOKEN_EXPIRES || '5m', // How often an access token expires
	authRefreshTokenExpiresShort: process.env.AUTH_REFRESH_TOKEN_EXPIRES_SHORT || '1d', // How often a refresh token expires
	authRefreshTokenExpiresLong: process.env.AUTH_REFRESH_TOKEN_EXPIRES_LONG || '7d', // How often a refresh token expires
	authMaxFail: parseInt(process.env.AUTH_MAX_FAIL || '5', 10), // How many failed login attempts allowed
	authMaxCooldown: parseInt(process.env.AUTH_MAX_COOLDOWN || '300', 10), // How many seconds to lock failed login attempts out
	authSharedCacheConnectorKey: process.env.AUTH_SHAREDCACHE_CONNECTOR || 'sharedCache', // What is the key the SharedConnector stored as in Connectors?
	authRoleCacheExpires: parseInt(process.env.AUTH_ROLE_CACHE_EXPIRES || '3600', 10), // How long does the role caching last in seconds
	authCorsOrigin: process.env.CORS_ORIGIN?.split(',').map(s => s.trim()) || false,
	authRefreshCookieName: process.env.AUTH_REFRESH_COOKIE_NAME || 'refresh',
	authPasswordSaltRounds: parseInt(process.env.AUTH_PASSWORD_SALT_ROUNDS || '11', 10),
	production: process.env.NODE_ENV === 'production',
}));
