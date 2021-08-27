import type {ImperiumStateClientModule} from '@imperium/state/src';
import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {state} from './state';
import {renderRoutes} from './renderRoutes';
import {routes} from './routes';

export function sampleStateModule(): ImperiumStateClientModule & ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'StateSample',
		state,
		routes: renderRoutes,
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
