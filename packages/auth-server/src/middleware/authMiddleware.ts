import debug from 'debug';
import intersection from 'lodash/intersection';
import jwt from 'express-jwt';
import {compose} from '@imperium/server';
import type {AuthContext} from '@imperium/context-manager';
import type {AuthMiddlewareConfig} from '../types';
import {environment} from '../environment';

const d = debug('imperium.auth-server.authMiddleware');
const env = environment();

export function authMiddleware(config: AuthMiddlewareConfig) {
	return compose([
		jwt({
			secret: env.authAccessTokenSecret,
			credentialsRequired: config.credentialsRequired === undefined ? false : config.credentialsRequired,
		}),
		(req, res, next) => {
			function getAuthContextMethods(id: null | number | string, permissions: string[]): AuthContext {
				return {
					id,
					permissions,
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
				d('Auth token present and valid');
				// @ts-ignore
				config.requiredDomain.getPermissions(req.user.roles || []).then(permissions => {
					// @ts-ignore
					req.auth = getAuthContextMethods(req.user?.id, permissions);
					next();
				});
			} else {
				d('Auth token not present');
				// @ts-ignore
				req.auth = getAuthContextMethods(null, []);
				next();
			}
		},
	]);
}
