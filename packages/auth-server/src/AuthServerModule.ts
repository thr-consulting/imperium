/* eslint-disable import/no-cycle */
// see: https://github.com/babel/babel/issues/10981
import {IImperiumServer, ImperiumServerModule} from '@imperium/server';
import {endpoints} from './endpoints';
import {authMiddleware} from './middleware/authMiddleware';
import {AuthContext} from './models/Auth';
import {RoleContext} from './models/Role';

export function AuthModuleContext(server: IImperiumServer) {
	return {
		...RoleContext(server),
		...AuthContext(),
	};
}

export function AuthServerModule(): ImperiumServerModule {
	return {
		name: '@imperium/auth-server',
		environment() {
			return {
				authServerDomain: process.env.AUTH_SERVER_DOMAIN || 'localhost', // Which domain is the auth server running on. Used for cookies.
				authLoginUrl: process.env.AUTH_LOGIN_URL || '/api/login', // URL for REST login
				authRefreshUrl: process.env.AUTH_REFRESH_URL || '/api/refresh', // URL for REST refresh access token
				authForgotPasswordUrl: process.env.AUTH_FORGOTPASSWORD_URL || '/api/forgot-password', // URL to request password reset
				authAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure', // Secret for access tokens
				authRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'notsecure', // Secret for refresh tokens
				authAccessTokenExpires: process.env.AUTH_ACCESS_TOKEN_EXPIRES || '5m', // How often an access token expires
				authRefreshTokenExpires: process.env.AUTH_REFRESH_TOKEN_EXPIRES || '7d', // How often a refresh token expires
				authMaxFail: parseInt(process.env.AUTH_MAX_FAIL || '5', 10), // How many failed login attempts allowed
				authMaxCooldown: parseInt(process.env.AUTH_MAX_COOLDOWN || '300', 10), // How many seconds to lock failed login attempts out
				// What is the key the SharedConnector stored as in Connectors?
				authSharedCacheConnectorKey: process.env.AUTH_SHAREDCACHE_CONNECTOR || 'sharedCache',
				authRoleCacheExpires: parseInt(process.env.AUTH_ROLE_CACHE_EXPIRES || '3600', 10), // How long does the role caching last in seconds
				authCorsOrigin: process.env.CORS_ORIGIN || false,
				authRefreshCookieName: process.env.AUTH_REFRESH_COOKIE_NAME || 'refresh',
				authPasswordSaltRounds: parseInt(process.env.AUTH_PASSWORD_SALT_ROUNDS || '11', 10),
			};
		},
		middleware() {
			return {
				authMiddleware,
			};
		},
		context: (server: IImperiumServer) => AuthModuleContext(server),
		endpoints: (server: IImperiumServer) => endpoints(server),
		async startup(server: IImperiumServer) {
			const cacheKey = server.environment.authSharedCacheConnectorKey;
			if (!server.connectors[cacheKey as string]) {
				throw new Error(`@imperium/auth-server expects a SharedCache instance called: ${cacheKey}`);
			}
		},
	};
}

// export {ImperiumAuthServerModule, ServiceInfo} from './types';
