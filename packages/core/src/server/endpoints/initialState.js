import debug from 'debug';
import jwt from 'express-jwt';
import {toJSON} from 'transit-immutable-js';
import {Map} from 'immutable';
import middleware from '../middleware';

const d = debug('imperium.core.server.initialState');

export default function({app, connectors, modules}) {
	const {context, userAuth} = middleware;
	app.use(
		'/api/initial-state',
		jwt({
			secret: process.env.JWT_SECRET,
			credentialsRequired: true,
		}),
		context({connectors, modules}),
		userAuth(),
		(req, res) => {
			d('Initial state endpoint');
			req.context.models.Auth.serializeAuth(req.auth)
				.then(serializedAuth => {
					const serializedState = JSON.stringify(toJSON(new Map({
						auth: serializedAuth,
					})));
					res.setHeader('Content-Type', 'application/json');
					res.send(serializedState);
				});
		},
	);
}
