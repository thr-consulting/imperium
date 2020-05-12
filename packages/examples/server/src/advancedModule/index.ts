import {authMiddleware} from '@imperium/auth-server';
import type {AuthContext} from '@imperium/context-manager';
import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {RequestHandler} from 'express';
import {authDomainBridge} from '../core/authDomainBridge';
import {connectors} from '../core/connectors';
import {Context, contextCreator} from '../core/context';

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
			server.contextMiddleware(),
			authMiddleware({
				requiredDomain: authDomainBridge(contextCreator(connectors)),
				credentialsRequired: false,
			}),
			myMiddleware(),
			(req, res) => {
				// @ts-ignore
				const {auth}: {auth: AuthContext} = req;
				d(auth.hasPermission(['blah']));
				res.send('Advanced endpoint');
				res.end();
			},
		);
	},
};
