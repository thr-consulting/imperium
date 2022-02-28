import {compose} from '@imperium/server';
import {Environment} from '@thx/env';
import debug from 'debug';
import type {RequestHandler} from 'express';
import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';
import type {Algorithm} from 'jsonwebtoken';
import type {AuthMiddlewareConfig} from '../types';

const d = debug('imperium.auth-server.middleware.authMiddleware');

const {verify} = jsonwebtoken;

export interface Auth {
	id: string;
}

function urlParameterAuth(config: AuthMiddlewareConfig): RequestHandler {
	return (req, res, next) => {
		const authAccessTokenSecret = Environment.getString('ACCESS_TOKEN_SECRET');
		const authAccessTokenAlgorithms = Environment.getString('ACCESS_TOKEN_ALGORITHMS')
			.split(',')
			.map(s => s.trim()) as Algorithm[];
		const {token} = req.query;

		if (token && typeof token === 'string') {
			req.user = verify(token, authAccessTokenSecret, {
				algorithms: authAccessTokenAlgorithms,
			});
		} else if (config.credentialsRequired) {
			throw new Error('Credentials are required');
		}
		next();
	};
}

export function authMiddleware(config: AuthMiddlewareConfig): RequestHandler {
	const authAccessTokenSecret = Environment.getString('ACCESS_TOKEN_SECRET');
	const authAccessTokenAlgorithms = Environment.getString('ACCESS_TOKEN_ALGORITHMS')
		.split(',')
		.map(s => s.trim()) as Algorithm[];

	const middlewareArr: RequestHandler[] = [];

	// Use either query token middleware or jwt header middleware
	if (config.authQueryToken) {
		middlewareArr.push(urlParameterAuth(config));
	} else {
		middlewareArr.push(
			jwt({
				secret: authAccessTokenSecret,
				algorithms: authAccessTokenAlgorithms,
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
