import debug from 'debug';
import jwt from 'express-jwt';
import {EndpointOptions} from '@imperium/core';

const d = debug('imperium.auth.initialState');

// TODO This isn't initial state, but initial auth
export default function initialState({app, connectors, modules, middleware}: EndpointOptions): void {
	const {contextMiddleware, userAuthMiddleware} = middleware;
	app.use(
		'/api/initial-state',
		jwt({
			secret: process.env.JWT_SECRET || 'secretfail',
			credentialsRequired: true,
		}),
		contextMiddleware({connectors, modules}),
		userAuthMiddleware(),
		(req, res) => {
			d('Initial state endpoint');
			if (req.context.models.Auth && req.context.models.Auth.serializeAuth) {
				req.context.models.Auth.serializeAuth(req.auth)
					.then(serializedAuth => {
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
