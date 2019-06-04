import debug from 'debug';
import {decode} from 'jsonwebtoken';
import {EndpointOptions} from '@imperium/core';
import get from 'lodash/get';
import find from 'lodash/find';
import restError from './restError';

const d = debug('imperium.auth.refreshToken');

export default function refreshToken({app, connectors, modules, middleware}: EndpointOptions) {
	app.use(
		'/api/rtoken',
		middleware.contextMiddleware({connectors, modules}),
		(req, res) => {
			d('Getting a renewed token');
			req.context.models.Auth.refreshToken(req.headers['refresh-token'])
				.then(newToken => {
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify({
						access_token: newToken,
					}));
				})
				.catch(err => {
					restError(err, res);
				});
			const token = decode(req.headers['refresh-token']);

			if (!token || !token.id || !token.exp) {
				res.status(500).send('Token not valid');
			} else if (Date.now() / 1000 > token.exp) {
				res.status(500).send('Token is expired');
			} else {
				req.context.models.User.getById(token.id).then(user => {
					if (user) {
						const {servicesField, roles} = req.context.models.User.getData(user);
						if (find(get(user, [servicesField, 'token', 'blacklist'], []), {token: token.rnd})) {
							res.status(500).send('Token has been deauthorized');
						} else {
							res.setHeader('Content-Type', 'application/json');
							res.send(JSON.stringify({
								access_token: req.context.models.Auth.signJwt({id: token.id, roles}),
							}));
						}
					} else {
						res.status(500).send('User not found');
					}
				});
			}
		},
	);
}
