import type {ImperiumServerModule} from '@imperium/server';
import {endpoints} from './endpoints';
import {environment} from './environment';
import {authMiddleware} from './middleware/authMiddleware';

const env = environment();

export interface AuthContext {
	// id: null,
	// permissions: null,
	// hasPermission(perms) {
	// 	return req.context.Role.permissionsMatch(permissions, perms);
	// },
	// getCache(key) {
	// 	return req.context.Auth.getCache(key, req.context);
	// },
	// setCache(key, allowed, expire) {
	// 	return req.context.Auth.setCache(key, !!allowed, req.context, expire);
	// },
	// invalidateCache(key) {
	// 	return req.context.Auth.invalidateCache(key, req.context);
	// },
}

interface User {
	id: number;
}

export interface AuthRequiredContext {
	getUserById(): User;
}

export function CreateAuthServerModule(context: AuthRequiredContext): ImperiumServerModule<any, any> {
	return {
		name: '@imperium/auth-server',
		middleware() {
			return {
				authMiddleware,
			};
		},
		endpoints,
		async startup(server) {
			const cacheKey = env.authSharedCacheConnectorKey;
			if (!server.connectors[cacheKey as string]) {
				throw new Error(`@imperium/auth-server expects a SharedCache instance called: ${cacheKey}`);
			}
		},
	};
}
