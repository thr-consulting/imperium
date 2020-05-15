import {authMiddleware} from '@imperium/auth-server';
import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {RequestHandler} from 'express';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/context';

const d = debug('imperium.examples.server.advancedModule');

function myMiddleware(): RequestHandler {
	return (req, res, next) => {
		next();
	};
}

export const advancedModule = (): ImperiumServerModule<Context, typeof connectors> => ({
	name: 'Advanced Server Module',
	async startup(server, context) {
		d('Running startup code');
		// d(`Has access to server: ${Object.keys(server.connectors.connections)}`);
		// d(`Has access to context: ${context.domain2.anything}`);
	},
	endpoints(server) {
		server.expressApp.get(
			'/adv',
			authMiddleware({
				credentialsRequired: false,
			}),
			server.contextMiddleware(),
			myMiddleware(),
			(req, res) => {
				// @ts-ignore
				d('User:', req.user);
				// @ts-ignore
				d('Auth:', req.auth);
				res.send('Advanced endpoint');
				res.end();
			},
		);
	},
});
