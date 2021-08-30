import type {ImperiumStateClientModule} from '@imperium/state/src';
import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {state} from './state';
import {layout, routeProps} from './layout';

export function sampleStateModule(): ImperiumStateClientModule & ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'StateSample',
		state,
		routeProps,
		layout,
	};
}
