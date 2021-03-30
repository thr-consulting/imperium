import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import {voyagerHtml} from './voyagerHtml';

export function voyagerServerModule(): ImperiumServerModule<any> {
	return {
		name: 'Voyager Graphql Visualization',
		endpoints: (server: ImperiumServer<any>) => {
			server.expressApp.get('/api/voyager', (req, res) => {
				res.type('text/html').send(voyagerHtml);
			});
		},
	};
}
