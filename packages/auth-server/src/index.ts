import type {ImperiumServerModule} from '@imperium/server';
import {createAuthEndpoints} from './endpoints';
import type {GetAuthenticationFn} from './types';

export {ServiceInfo, AuthMiddlewareConfig, AuthenticationDomain, GetAuthenticationFn} from './types';
export {authMiddleware, Auth} from './middleware/authMiddleware';
export {createAccessToken, createRefreshToken} from './lib/token';
export {encryptPassword} from './lib/password';

export function authServerModule(getAuthFn: GetAuthenticationFn): ImperiumServerModule<any> {
	return {
		name: '@imperium/auth-server',
		endpoints: createAuthEndpoints(getAuthFn),
		environmentDefaults: {
			AUTH_SERVER_DOMAIN: 'localhost', // Which domain is the auth server running on. Used for cookies.
			AUTH_LOGIN_URL: '/api/login', // URL for REST login
			AUTH_REFRESH_URL: '/api/refresh', // URL for REST refresh access token
			AUTH_FORGOTPASSWORD_URL: '/api/forgot-password', // URL to request password reset
			ACCESS_TOKEN_SECRET: 'notsecure', // Secret for access tokens
			ACCESS_TOKEN_ALGORITHMS: 'HS256', // Comma separated list of supported access token algorithms
			REFRESH_TOKEN_SECRET: 'notsecure', // Secret for refresh tokens
			AUTH_ACCESS_TOKEN_EXPIRES: '5m', // How often an access token expires
			AUTH_REFRESH_TOKEN_EXPIRES_SHORT: '1d', // How often a refresh token expires
			AUTH_REFRESH_TOKEN_EXPIRES_LONG: '7d', // How often a refresh token expires
			AUTH_MAX_FAIL: 5, // How many failed login attempts allowed
			AUTH_MAX_COOLDOWN: 300, // How many seconds to lock failed login attempts out
			// CORS_ORIGIN: '', // No default
			AUTH_REFRESH_COOKIE_NAME: 'refresh',
			// AUTH_PASSWORD_SALT_ROUNDS: 11, // Number of rounds to bcrypt the passwords
		},
	};
}
