import debug from 'debug';
import {decode} from 'jsonwebtoken';
import get from 'lodash/get';
import find from 'lodash/find';
import {IImperiumServer} from '@imperium/server';
import restError from './restError';

const d = debug('imperium.auth.refreshToken');

export default function refreshToken(server: IImperiumServer) {
	d('Adding refresh token endpoint: /api/refreshtoken');
	server.app.use('/api/refreshtoken', server.middleware.contextMiddleware(), (req, res) => {
		d('Refreshing access token');
		req.context.models.Auth.refreshAccessToken(req.headers['refresh-token'])
			.then((newToken: string) => {
				res.setHeader('Content-Type', 'application/json');
				res.send(
					JSON.stringify({
						access_token: newToken,
					}),
				);
			})
			.catch((err: Error) => {
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
						res.send(
							JSON.stringify({
								access_token: req.context.models.Auth.signAccessToken({id: token.id, roles}),
							}),
						);
					}
				} else {
					res.status(500).send('User not found');
				}
			});
		}
	});
}
