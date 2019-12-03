/* eslint-disable import/no-dynamic-require, global-require */
import debug from 'debug';
import get from 'lodash/get';
import set from 'lodash/set';
import jwt from 'jsonwebtoken';
import {ImperiumRequest, ImperiumRequestHandler} from '@imperium/server';
import Auth from '../models/Auth';
import {ImperiumAuthRequest} from '../types';
import {RequestHandler} from 'express';
import {IContextManager} from '@imperium/server/dist/types';

const d = debug('imperium.auth-server.userAuthMiddleware');
const dd = debug('verbose.imperium.auth-server.userAuthMiddleware');

/**
 * Express middleware that uses the Auth model and JWT to build authentication information.
 * @param tokenReqPath
 * @param secret
 * @return {function(*=, *, *)}
 */
export default function userAuthMiddleware({tokenReqPath = null, secret = null} = {}): RequestHandler {
	return (req, res, next) => {
		dd('User auth middleware');

		if (!req.contextManager) throw new Error('Context manager needs to be created before calling userAuthMiddleware');

		const contextManager: IContextManager = req.contextManager;

		// // Build the default auth section
		// req.auth = Auth.defaultAuth();
		//
		// // Check if token is passed via req instead of already processed via jwt middleware.
		// // This lets us call this from other API's, like REST.
		// const jwtToken = get(req, tokenReqPath);
		// if (jwtToken) {
		// 	const decodedToken = jwt.verify(jwtToken, secret);
		// 	set(req, 'user', decodedToken);
		// }
		//
		// // If valid JWT present
		// if (req.user) {
		// 	Auth.buildAuthFromJwt(req.user).then(auth => {
		// 		req.auth = auth;
		// 		req.context.auth = auth;
		// 		next();
		// 	});
		// } else {
		// 	next();
		// }
	};
}
