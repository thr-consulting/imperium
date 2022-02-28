import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import {voyagerHtml} from './voyagerHtml';

export function voyagerServerModule(): ImperiumServerModule<any> {
	return {
		name: '@imperium/voyager',
		endpoints: async (server: ImperiumServer<any>) => {
			server.expressApp.get('/api/voyager', (req, res) => {
				res.type('text/html').send(voyagerHtml);
			});
		},
	};
}
