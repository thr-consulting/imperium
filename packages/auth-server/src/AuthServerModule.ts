import type {ImperiumServerModule} from '@imperium/server';
import {createAuthEndpoints} from './endpoints';
import {environment} from './environment';
import {createAuthMiddleware} from './middleware/authMiddleware';
import type {AuthRequiredDomain} from './types';

const env = environment();

export function CreateAuthServerModule<Context = any>(options: AuthRequiredDomain): ImperiumServerModule<any, any> {
	return {
		name: '@imperium/auth-server',
		middleware() {
			return {
				auth: createAuthMiddleware(options),
			};
		},
		endpoints: createAuthEndpoints(options),
		async startup(server) {
			const cacheKey = env.authSharedCacheConnectorKey;
			if (!server.connectors[cacheKey]) {
				throw new Error(`@imperium/auth-server expects a SharedCache instance called: ${cacheKey}`);
			}
		},
	};
}
