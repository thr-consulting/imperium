import debug from 'debug';
import jwt from 'express-jwt';
import {toJSON} from 'transit-immutable-js';
import {Map} from 'immutable';
import context from '../middleware/context';
import userAuth from '../middleware/userAuth';

const d = debug('imperium.core.server.initialState');

export default function({app, connectors, modules}) {
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
			req.auth.get('user')().then(user => {
				res.setHeader('Content-Type', 'application/json');

				// Use transitJS to send the Immutable Map of auth data to the client
				res.send(JSON.stringify(toJSON(new Map({
					auth: new Map({
						userId: req.auth.get('userId'),
						permissions: req.auth.get('permissions'),
						user,
					}),
				}))));
			});
		},
	);
}
