/* eslint-disable import/no-dynamic-require, global-require */
import debug from 'debug';
import get from 'lodash/get';
import set from 'lodash/set';
import jwt from 'jsonwebtoken';
import {ImperiumRequestHandler} from '../../../types';

const d = debug('imperium.core.server.userAuth');

/**
 * Express middleware that uses the Auth model and JWT to build authentication information.
 * @param tokenReqPath
 * @param secret
 * @return {function(*=, *, *)}
 */
export default function({tokenReqPath = null, secret = null} = {}): ImperiumRequestHandler {
	return (req, res, next) => {
		d('Building authentication data');

		// Grab the current context
		const {context} = req;
		const {Auth} = context.models;

		// Only decode JWT if we have appropriate model methods
		if (Auth && Auth.defaultAuth && Auth.buildAuthFromJwt) {
			// Build the default auth section
			const baseAuth = Auth.defaultAuth();
			req.auth = baseAuth;

			if (!context) throw new Error('Context needs to be created before calling userAuthMiddleware');

			// Check if token is passed via req instead of already processed via jwt middleware.
			// This lets us call this from other API's, like REST.
			const jwtToken = get(req, tokenReqPath);
			if (jwtToken) {
				const decodedToken = jwt.verify(jwtToken, secret);
				set(req, 'user', decodedToken);
			}

			// If valid JWT present
			if (req.user) {
				Auth.buildAuthFromJwt(req.user)
					.then(auth => {
						req.auth = auth;
						req.context.auth = auth;
						next();
					});
			} else {
				next();
			}
		} else {
			// No Auth model methods specified
			d('Appropriate Auth model methods not present. Cannot provide user authentication');
			req.auth = null;
			req.user = null;
			req.context.auth = null;
			next();
		}
	};
}
