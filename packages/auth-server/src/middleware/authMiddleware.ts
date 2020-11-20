import debug from 'debug';
import jwt from 'express-jwt';
import {verify, Algorithm} from 'jsonwebtoken';
import {compose} from '@imperium/server';
import type {RequestHandler} from 'express';
import type {AuthMiddlewareConfig} from '../types';
import {environment} from '../environment';

const d = debug('imperium.auth-server.authMiddleware');
const env = environment();

export interface Auth {
	id: string;
}

function urlParameterAuth(config: AuthMiddlewareConfig): RequestHandler {
	return (req, res, next) => {
		const {token} = req.query;

		if (token && typeof token === 'string') {
			// @ts-ignore
			req.user = verify(token, env.authAccessTokenSecret, {
				algorithms: env.authAccessTokenAlgorithms as Algorithm[],
			});
		} else if (config.credentialsRequired) {
			throw new Error('Credentials are required');
		}
		next();
	};
}

export function authMiddleware(config: AuthMiddlewareConfig): RequestHandler {
	const middlewareArr: RequestHandler[] = [];

	// Use either query token middleware or jwt header middleware
	if (config.authQueryToken) {
		middlewareArr.push(urlParameterAuth(config));
	} else {
		middlewareArr.push(
			jwt({
				secret: env.authAccessTokenSecret,
				algorithms: env.authAccessTokenAlgorithms,
				credentialsRequired: config.credentialsRequired === undefined ? false : config.credentialsRequired,
			}),
		);
	}

	return compose([
		...middlewareArr,
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
