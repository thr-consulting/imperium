import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {routes} from './routes';

export function sampleGraphqlModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample Graphql Module',
		routes,
		layout: {
			sidebar: [
				{
					to: routes.to.sampleGraphql(),
					text: 'Graphql',
				},
			],
		},
	};
}
