import debug from 'debug';
import {Map} from 'immutable';
import get from 'lodash/get';
import set from 'lodash/set';
import jwt from 'jsonwebtoken';

const d = debug('imperium.core.server.userAuth');

/**
 * Express middleware that reads a JWT and loads the user details.
 *
 * Sets:
 *   - req.auth: Immutable Map of auth data
 *   - req.context.auth: Immutable Map of auth data
 *   - req.user: Decoded JWT token
 *
 * @param tokenReqPath - Optional path of req where a JWT is stored
 * @param secret - Optional secret to use when verifying JWT
 * @returns {function(*=, *, *)}
 */
export default function({tokenReqPath = null, secret = null} = {}) {
	return (req, res, next) => {
		d('Building authentication data');

		const {context} = req;

		// Build the default auth section (no user/no permissions)
		const defaultAuth = new Map({
			userId: null,
			user: () => null,
			permissions: [],
		});
		req.auth = defaultAuth;

		if (!context) throw new Error('Context needs to be created before calling userAuthMiddleware');
		req.context.auth = req.auth;

		// Check if token is passed via req instead of already processed via jwt middleware.
		const jwtToken = get(req, tokenReqPath);
		if (jwtToken) {
			const decodedToken = jwt.verify(jwtToken, secret);
			set(req, 'user', decodedToken);
		}

		// If valid JWT present
		if (req.user) {
			// Assign the user id
			req.auth = req.auth.set('userId', req.user.id);

			// Create a function that returns the current user (simulated redux on the server)
			req.auth = req.auth.set('user', async () => {
				const user = await req.context.models.Users.getById(req.user.id);
				if (!user) return defaultAuth;
				return {
					id: user._id, // eslint-disable-line no-underscore-dangle
					profile: {
						name: `${user.profile.firstName} ${user.profile.lastName}`.trim(),
						firstName: user.profile.firstName,
						lastName: user.profile.lastName,
					},
					emails: user.emails,
				};
			});

			// Fetch the permissions of the current user
			req.context.models.Auth.getPermissions(req.user.roles)
				.then(permissions => {
					d(`Permissions: ${permissions}`);
					req.auth = req.auth.set('permissions', permissions);
					req.context.auth = req.auth;
					next();
				});
		} else {
			next();
		}
	};
}
