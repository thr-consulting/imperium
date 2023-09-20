import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {createAuthEndpoints} from './endpoints';
import type {GetAuthenticationFn} from './types';

export type {
	ServiceInfo,
	AuthMiddlewareConfig,
	AuthenticationDomain,
	GetAuthenticationFn,
	LoginInfo,
	RefreshToken,
	Password,
	LogoutInfo,
	VerifyRefreshReturn,
	VerifyLoginReturn,
} from './types';
export {authMiddleware} from './middleware/authMiddleware';
export type {Auth} from './middleware/authMiddleware';
export {createAccessToken, createRefreshToken} from './lib/token';
export {encryptPassword, validatePassword} from './lib/password';

const d = debug('imperium.auth-server');

export interface AuthServerModuleOptions {
	getAuthFn: GetAuthenticationFn;
	enableAppLogin?: boolean;
}

export function authServerModule(authServerModuleOptions: AuthServerModuleOptions): ImperiumServerModule<any> {
	return {
		name: '@imperium/auth-server',
		endpoints: createAuthEndpoints(authServerModuleOptions),
	};
}
