import type {ImperiumLayoutClientModule} from '@imperium/layout';
import type {ImperiumRouterClientModule} from '@imperium/router';
import {layout, routeProps} from './layout';

export function sampleAuthModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'AuthSample',
		routeProps,
		layout,
	};
}
