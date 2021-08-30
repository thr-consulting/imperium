import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {routeProps, layout} from './layout';

export function sampleApolloCacheModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample Apollo Cache Module',
		routeProps,
		layout,
	};
}
