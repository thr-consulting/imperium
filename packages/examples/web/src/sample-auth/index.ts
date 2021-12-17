import type {ImperiumLayoutClientModule} from '@imperium/layout';
import type {ImperiumRouterClientModule} from '@imperium/router';
import {layout} from './layout';
import {routeProps} from './pages';

export function sampleAuthModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'AuthSample',
		routeProps,
		layout,
	};
}
