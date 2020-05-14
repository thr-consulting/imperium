import type {ImperiumServerModule} from '@imperium/server';
import {createAuthEndpoints} from './endpoints';
import {environment} from './environment';
import type {AuthRequiredDomain} from './types';

export {ServiceInfo, AuthRequiredDomain, AuthMiddlewareConfig} from './types';
export {authMiddleware, Auth} from './middleware/authMiddleware';

const env = environment();

export function authServerModule<Context = any>(options: AuthRequiredDomain): ImperiumServerModule<Context, any> {
	return {
		name: '@imperium/auth-server',
		endpoints: createAuthEndpoints(options),
		async startup(server) {
			const cacheKey = env.authSharedCacheConnectorKey;
			if (!server.connectors.connections[cacheKey]) {
				throw new Error(`@imperium/auth-server expects a SharedCache instance called: ${cacheKey}`);
			}
		},
	};
}
