import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {routes} from './routes';
import {renderRoutes} from './renderRoutes';

export function sampleGraphqlModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample Graphql Module',
		routes: renderRoutes,
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
