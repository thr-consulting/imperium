import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import './defaults';
import {createAuthEndpoints} from './endpoints';
import type {GetAuthenticationFn} from './types';

export {ServiceInfo, AuthMiddlewareConfig, AuthenticationDomain, GetAuthenticationFn} from './types';
export {authMiddleware, Auth} from './middleware/authMiddleware';
export {createAccessToken, createRefreshToken} from './lib/token';
export {encryptPassword} from './lib/password';

const d = debug('imperium.auth-server');

export function authServerModule(getAuthFn: GetAuthenticationFn): ImperiumServerModule<any> {
	return {
		name: '@imperium/auth-server',
		endpoints: createAuthEndpoints(getAuthFn),
	};
}
