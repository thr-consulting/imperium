import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {createAuthEndpoints} from './endpoints';
import type {GetAuthenticationFn} from './types';

export type {ServiceInfo, AuthMiddlewareConfig, AuthenticationDomain, GetAuthenticationFn, LoginInfo, RefreshToken, Password} from './types';
export {authMiddleware} from './middleware/authMiddleware';
export type {Auth} from './middleware/authMiddleware';
export {createAccessToken, createRefreshToken} from './lib/token';
export {encryptPassword, validatePassword} from './lib/password';

const d = debug('imperium.auth-server');

export function authServerModule(getAuthFn: GetAuthenticationFn): ImperiumServerModule<any> {
	return {
		name: '@imperium/auth-server',
		endpoints: createAuthEndpoints(getAuthFn),
	};
}
