import type {ImperiumLayoutClientModule} from '@imperium/layout';
import type {ImperiumRouterClientModule} from '@imperium/router';
import {layout, routeProps} from './layout';

export function sampleGraphqlModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample Graphql Module',
		routeProps,
		layout,
	};
}
