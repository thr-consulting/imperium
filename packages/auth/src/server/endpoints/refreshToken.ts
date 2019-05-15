import debug from 'debug';
import {decode} from 'jsonwebtoken';
import {EndpointOptions} from '@imperium/core';

const d = debug('imperium.auth.refreshToken');

export default function refreshToken({app, connectors, modules, middleware}: EndpointOptions) {
	app.use(
		'/api/rtoken',
		middleware.contextMiddleware({connectors, modules}),
		(req, res) => {
			d('Getting a renewed token');
			const token = decode(req.headers['refresh-token']);

			if (!token || !token.id || !token.exp) {
				res.status(500).send('Token not valid');
			} else if (Date.now() / 1000 > token.exp) {
				res.status(500).send('Token is expired');
			} else {
				req.context.models.User.checkToken(token.id, token.rnd).then(ret => {
					if (ret) {
						d('RToken is not blacklisted');
						req.context.models.User.getById(token.id).then(user => {
							if (user) {
								res.setHeader('Content-Type', 'application/json');
								res.send(JSON.stringify({
									access_token: req.context.models.Auth.signJwt({id: token.id, roles: user.roles}),
								}));
							} else {
								res.status(500).send('User not found');
							}
						});
					} else {
						res.status(500).send('Token has been deauthorized');
					}
				});
			}
		},
	);
}
