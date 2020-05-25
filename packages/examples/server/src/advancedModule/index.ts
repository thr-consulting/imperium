import {authMiddleware} from '@imperium/auth-server';
import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {RequestHandler} from 'express';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/context';

const d = debug('imperium.examples.server.advancedModule');

function myMiddleware(): RequestHandler {
	return (req, res, next) => {
		// req.auth (comes from authMiddleware)
		// req.context (comes from contextMiddleware)
		next();
	};
}

/*
	This is an example of a more advanced server module. It utilizes the startup
	method which runs code at server startup.

	It also specifies a custom Express endpoint.
	The authMiddleware() places an `auth` key on the request.
	The contextMiddleware() places a `context` key on the request.
 */

export const advancedModule = (): ImperiumServerModule<Context, typeof connectors> => ({
	name: 'Advanced Server Module',
	async startup(server, context) {
		d('Running startup code');
		// Has access to server: server.connectors.connections
		// Has access to context: context.domainSimple.context.MyModel1
		await context.domainAdvanced.context.Score.genReport();
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
				d('Auth:', req.auth);

				res.send('Advanced endpoint');
				res.end();
			},
		);
	},
});
