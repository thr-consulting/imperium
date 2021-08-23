import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {routes} from './routes';
import {layout} from './layout';

export function sampleModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample',
		routes,
		layout,
	};
}
