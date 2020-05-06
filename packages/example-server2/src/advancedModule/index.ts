import {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {RequestHandler} from 'express';
import jwt from 'express-jwt';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/server';

const d = debug('imperium.example-server2.advancedModule');

function myMiddleware(): RequestHandler {
	return (req, res, next) => {
		if (req.user) {

		}

		next();
	};
}

export const advancedModule: ImperiumServerModule<Context, typeof connectors> = {
	name: 'Advanced Server Module',
	async startup(server, context) {
		d('Running startup code');
	},
	endpoints(server) {
		server.expressApp.get(
			'/adv',
			jwt({
				secret: 'secret',
				credentialsRequired: false,
			}),
			myMiddleware(),
			(req, res) => {
				res.send('Advanced endpoint');
				res.end();
			},
		);
	},
};
