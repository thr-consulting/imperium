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

		if (req.user) {
			req.contextManager.Role.getCachedPermissions(req.user.roles, req.contextManager).then((permissions: string[]) => {
				// req.user is our decoded access token IF jwt() middleware was called first.
				// If jwt() middleware was not called it will look like we are unauthenticated
				req.contextManager.auth = {
					id: req.user?.id,
					permissions,
					hasPermission(perms: string | string[]): boolean {
						return req.contextManager.Role.permissionsMatch(permissions, perms);
					},
					getCache(key: string | string[]): Promise<boolean | null> {
						return req.contextManager.Auth.getCache(key, req.contextManager);
					},
					async setCache(key: string | string[], allowed: boolean, expire?: number): Promise<void> {
						await req.contextManager.Auth.setCache(key, allowed, req.contextManager, expire);
					},
					invalidateCache(key: string | string[]): Promise<void> {
						return req.contextManager.Auth.invalidateCache(key, req.contextManager);
					},
				} as AuthContext;
				next();
			});
		} else {
			next();
		}
	};
}
