import type {ImperiumRequest} from '@imperium/server';
import debug from 'debug';
import type {NextFunction, Response} from 'express';
import type {AuthRequiredContext} from '../AuthServerModule';
import type {Context} from '../index';
import type {AccessToken} from '../types';

const d = debug('imperium.auth-server.authMiddleware');

export function authMiddleware(context: AuthRequiredContext) {
	return (req: ImperiumRequest<Context> & {user?: AccessToken}, res: Response, next: NextFunction) => {
		if (!req.context) {
			throw new Error('ContextManager middleware needs to be called before calling authMiddleware.');
		}

		function getAuthContextMethods(permissions: string[]): Context {
			return {
				id: null,
				permissions: null,
				hasPermission(perms) {
					return req.context.Role.permissionsMatch(permissions, perms);
				},
				getCache(key) {
					return req.context.Auth.getCache(key, req.context);
				},
				setCache(key, allowed, expire) {
					return req.context.Auth.setCache(key, !!allowed, req.context, expire);
				},
				invalidateCache(key) {
					return req.context.Auth.invalidateCache(key, req.context);
				},
			};
		}

		if (req.user) {
			req.context.Role.getCachedPermissions(req.user.roles || [], req.context).then((permissions: string[]) => {
				// req.user is our decoded access token IF jwt() middleware was called first.
				// If jwt() middleware was not called it will look like we are unauthenticated
				req.context.auth = {
					...getAuthContextMethods(permissions),
					id: req.user?.id,
					permissions,
				} as Context;
				next();
			});
		} else {
			req.context.auth = {permissions: [], ...getAuthContextMethods([])};
			next();
		}
	};
}
