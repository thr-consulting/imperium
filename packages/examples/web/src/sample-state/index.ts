import type {ImperiumStateClientModule} from '@imperium/state/src';
import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {state} from './state';
import {routes} from './routes';

export function sampleStateModule(): ImperiumStateClientModule & ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'StateSample',
		state,
		routes,
		layout: {
			sidebar: [
				{
					to: routes.to.state(),
					text: 'State',
				},
			],
		},
	};
}
