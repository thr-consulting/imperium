import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import {voyagerHtml} from './voyagerHtml';

export function voyagerServerModule(): ImperiumServerModule<any, any> {
	return {
		name: 'Voyager Graphql Visualization',
		endpoints: (server: ImperiumServer<any, any>) => {
			server.expressApp.get('/api/voyager', (req, res) => {
				res.type('text/html').send(voyagerHtml);
			});
		},
	};
}
