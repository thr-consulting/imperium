import {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/server';

const d = debug('imperium.example-server2.advancedModule');

export const advancedModule: ImperiumServerModule<Context, typeof connectors> = {
	name: 'Advanced Server Module',
	async startup(server, context) {
		d('Running startup code');
	},
	endpoints(server) {
		server.expressApp.get('/adv', (req, res) => {
			res.send('Advanced endpoint');
			res.end();
		});
	},
};
