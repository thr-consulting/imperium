import debug from 'debug';
import type {RequestHandler} from 'express';
import intersection from 'lodash/intersection';
import jwt from 'express-jwt';
import type {AuthContext, AuthRequiredDomain} from '../types';
import {environment} from '../environment';

const d = debug('imperium.auth-server.authMiddleware');

export function authMiddleware(options: AuthRequiredDomain): RequestHandler[] {
	return [
		jwt({
			secret: environment().authAccessTokenSecret,
			credentialsRequired: false,
		}),
		(req, res, next) => {
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

			// @ts-ignore
			if (req.user) {
				// @ts-ignore
				options.getPermissions(req.user.roles || []).then(permissions => {
					// req.user is our decoded access token IF jwt() middleware was called first.
					// If jwt() middleware was not called it will look like we are unauthenticated
					// @ts-ignore
					req.auth = {
						...getAuthContextMethods(permissions),
						// @ts-ignore
						id: req.user?.id,
						permissions,
					} as AuthContext;
					next();
				});
			} else {
				// @ts-ignore
				req.auth = {permissions: [], ...getAuthContextMethods([])};
				next();
			}
		},
	];
}
