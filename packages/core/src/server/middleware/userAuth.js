/* eslint-disable import/no-dynamic-require, global-require */
import debug from 'debug';
import get from 'lodash/get';
import set from 'lodash/set';
import jwt from 'jsonwebtoken';

const d = debug('imperium.core.server.userAuth');

export default function({tokenReqPath = null, secret = null} = {}) {
	return (req, res, next) => {
		d('Building authentication data');

		// Grab the current context
		const {context} = req;
		const {defaultAuth, buildAuthFromJwt} = context.models.Auth;

		// Build the default auth section
		const baseAuth = defaultAuth();
		req.auth = baseAuth;

		if (!context) throw new Error('Context needs to be created before calling userAuthMiddleware');
		// req.context.auth = req.auth;

		// Check if token is passed via req instead of already processed via jwt middleware.
		// This lets us call this from other API's, like REST.
		const jwtToken = get(req, tokenReqPath);
		if (jwtToken) {
			const decodedToken = jwt.verify(jwtToken, secret);
			set(req, 'user', decodedToken);
		}

		// If valid JWT present
		if (req.user) {
			buildAuthFromJwt(req.user)
				.then(auth => {
					req.auth = auth;
					req.context.auth = auth;
					next();
				});
		} else {
			next();
		}
	};
}
