import debug from 'debug';
import jwt from 'express-jwt';
import {compose} from '@imperium/server';
import type {AuthMiddlewareConfig} from '../types';
import {environment} from '../environment';

const d = debug('imperium.auth-server.authMiddleware');
const env = environment();

export interface Auth {
	id: string;
}

export function authMiddleware(config: AuthMiddlewareConfig) {
	return compose([
		jwt({
			secret: env.authAccessTokenSecret,
			algorithms: env.authAccessTokenAlgorithms,
			credentialsRequired: config.credentialsRequired === undefined ? false : config.credentialsRequired,
		}),
		(req, res, next) => {
			// @ts-ignore
			if (req.user) {
				d('JWT present and valid');
				// @ts-ignore
				req.auth = {id: req.user.id} as Auth;
				next();
			} else {
				d('JWT not present');
				// @ts-ignore
				req.auth = null;
				next();
			}
		},
	]);
}
