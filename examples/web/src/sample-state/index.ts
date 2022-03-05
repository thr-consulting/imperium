import type {ImperiumLayoutClientModule} from '@imperium/layout';
import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumStateClientModule} from '@imperium/state';
import {layout, routeProps} from './layout';
import {state} from './state';

export function sampleStateModule(): ImperiumStateClientModule & ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'StateSample',
		state,
		routeProps,
		layout,
	};
}
