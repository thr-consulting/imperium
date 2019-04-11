import debug from 'debug';
import jwt from 'express-jwt';
import middleware from '../middleware';

const d = debug('imperium.core.server.initialState');

/**
 * HTTP GET endpoint that sends the initial state to the client if the user is authorized.
 * @param app
 * @param connectors
 * @param modules
 */
export default function({app, connectors, modules}): void {
	const {context, userAuth} = middleware;
	app.use(
		'/api/initial-state',
		jwt({
			secret: process.env.JWT_SECRET || 'secretfail',
			credentialsRequired: true,
		}),
		context({connectors, modules}),
		userAuth(),
		(req, res) => {
			d('Initial state endpoint');
			if (req.context.models.Auth && req.context.models.Auth.serializeAuth) {
				req.context.models.Auth.serializeAuth(req.auth)
					.then(serializedAuth => {
						// TODO expand initial state to include things from modules
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
