import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {routes} from './routes';

export function sampleApolloCacheModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample Apollo Cache Module',
		routes,
		layout: {
			sidebar: [
				{
					to: routes.to.apolloCache(),
					text: 'Apollo Cache',
				},
			],
		},
	};
}
