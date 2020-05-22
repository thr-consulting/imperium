import type {ImperiumServerModule} from '@imperium/server';
import {createAuthEndpoints} from './endpoints';
import type {GetAuthFn} from './types';

export {ServiceInfo, AuthMiddlewareConfig, AuthDomain, GetAuthFn} from './types';
export {authMiddleware, Auth} from './middleware/authMiddleware';

export function authServerModule(getAuthFn: GetAuthFn): ImperiumServerModule<any, any> {
	return {
		name: '@imperium/auth-server',
		endpoints: createAuthEndpoints(getAuthFn),
	};
}
