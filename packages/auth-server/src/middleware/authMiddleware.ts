/* eslint-disable import/no-cycle */
// see: https://github.com/babel/babel/issues/10981
import {AuthContext, ImperiumRequest} from '@imperium/server';
import debug from 'debug';
import {NextFunction, Response} from 'express';
import {AccessToken} from '../types';

const d = debug('imperium.auth-server.authMiddleware');

export function authMiddleware() {
	return (req: ImperiumRequest & {user?: AccessToken}, res: Response, next: NextFunction) => {
		if (!req.contextManager) {
			throw new Error('ContextManager middleware needs to be called before calling authMiddleware.');
		}

		function getAuthContextMethods(permissions: string[]): AuthContext {
			return {
				id: null,
				permissions: null,
				hasPermission(perms) {
					return req.contextManager.Role.permissionsMatch(permissions, perms);
				},
				getCache(key) {
					return req.contextManager.Auth.getCache(key, req.contextManager);
				},
				setCache(key, allowed, expire) {
					return req.contextManager.Auth.setCache(key, !!allowed, req.contextManager, expire);
				},
				invalidateCache(key) {
					return req.contextManager.Auth.invalidateCache(key, req.contextManager);
				},
			};
		}
		req.contextManager.auth = {permissions: [], ...getAuthContextMethods([])};

		if (req.user) {
			req.contextManager.Role.getCachedPermissions(req.user.roles || [], req.contextManager).then((permissions: string[]) => {
				// req.user is our decoded access token IF jwt() middleware was called first.
				// If jwt() middleware was not called it will look like we are unauthenticated
				req.contextManager.auth = {
					id: req.user?.id,
					permissions,
					...getAuthContextMethods(permissions),
				} as AuthContext;
				next();
			});
		}
		next();
	};
}
