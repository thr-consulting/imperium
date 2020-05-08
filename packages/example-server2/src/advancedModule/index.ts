import type {ImperiumServerModule} from '@imperium/server';
import {authMiddleware} from '@imperium/auth-server';
import debug from 'debug';
import type {RequestHandler} from 'express';
import {connectors} from '../core/connectors';
import {contextCreator, Context} from '../core/context';
import {authDomainBridge} from '../core/authDomainBridge';

const d = debug('imperium.example-server2.advancedModule');

function myMiddleware(): RequestHandler {
	return (req, res, next) => {
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
			authMiddleware({
				requiredDomain: authDomainBridge(contextCreator(connectors)),
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
