import debug from 'debug';
import jwt from 'express-jwt';
import {ImperiumServer} from '@imperium/core';
import {ClientAuth} from '../../../types';

const d = debug('imperium.auth.initialAuth');

// TODO This isn't initial state, but initial auth
export default function initialAuth(server: ImperiumServer): void {
	const {contextMiddleware, userAuthMiddleware} = server.middleware;

	d('Adding initial auth endpoint: /api/initial-auth');
	server.app.use(
		'/api/initial-auth',
		jwt({
			secret: server.options.authAccessTokenSecret,
			credentialsRequired: true,
		}),
		contextMiddleware(),
		userAuthMiddleware(),
		(req, res) => {
			d('Initial auth endpoint');
			if (req.context.models.Auth && req.context.models.Auth.serializeAuth) {
				req.context.models.Auth.serializeAuth(req.auth).then((serializedAuth: ClientAuth) => {
					const serializedState = JSON.stringify({
						auth: serializedAuth,
					});
					res.setHeader('Content-Type', 'application/json');
					res.send(serializedState);
				});
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.send({
					auth: null,
				});
			}
		},
	);
}
