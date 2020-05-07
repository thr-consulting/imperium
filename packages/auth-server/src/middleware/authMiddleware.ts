import debug from 'debug';
import intersection from 'lodash/intersection';
import jwt from 'express-jwt';
import {compose} from '@imperium/server';
import type {AuthContext, AuthMiddlewareConfig} from '../types';
import {environment} from '../environment';

const d = debug('imperium.auth-server.authMiddleware');
const env = environment();

export function authMiddleware(config: AuthMiddlewareConfig) {
	return compose([
		jwt({
			secret: environment().authAccessTokenSecret,
			credentialsRequired: config.credentialsRequired,
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
						return config.requiredDomain.getCache(key);
					},
					setCache(key, allowed, expire?) {
						return config.requiredDomain.setCache(key, allowed, expire);
					},
					invalidateCache(key) {
						return config.requiredDomain.invalidateCache(key);
					},
				};
			}

			// @ts-ignore
			if (req.user) {
				// @ts-ignore
				config.requiredDomain.getPermissions(req.user.roles || []).then(permissions => {
					// req.user is our decoded access token IF jwt() middleware was called first.
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
	]);
}
