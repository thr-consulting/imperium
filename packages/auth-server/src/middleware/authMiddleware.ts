import type {ImperiumRequest} from '@imperium/server';
import debug from 'debug';
import type {NextFunction, Response} from 'express';
import intersection from 'lodash/intersection';
import type {AccessToken, AuthContext, AuthRequiredDomain} from '../types';

const d = debug('imperium.auth-server.authMiddleware');

export function createAuthMiddleware(options: AuthRequiredDomain) {
	return function authMiddleware(req: ImperiumRequest<any> & {user?: AccessToken}, res: Response, next: NextFunction) {
		function getAuthContextMethods(permissions: string[]): AuthContext {
			return {
				id: null,
				permissions: null,
				hasPermission(need) {
					// compare the length of permissions that exist in both arrays to the ones we need.
					return intersection(permissions, need).length === need.length;
				},
				getCache(key) {
					return options.getCache(key);
				},
				setCache(key, allowed, expire?) {
					return options.setCache(key, allowed, expire);
				},
				invalidateCache(key) {
					return options.invalidateCache(key);
				},
			};
		}

		if (req.user) {
			options.getPermissions(req.user.roles || []).then(permissions => {
				// req.user is our decoded access token IF jwt() middleware was called first.
				// If jwt() middleware was not called it will look like we are unauthenticated
				req.context.auth = {
					...getAuthContextMethods(permissions),
					id: req.user?.id,
					permissions,
				} as AuthContext;
				next();
			});
		} else {
			req.context.auth = {permissions: [], ...getAuthContextMethods([])};
			next();
		}
	};
}
