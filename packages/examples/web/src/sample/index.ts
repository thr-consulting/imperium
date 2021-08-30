import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import debug from 'debug';
import {layout, routeProps} from './layout';

const d = debug('imperium.example.web.sample');

export function sampleModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample',
		routeProps,
		layout,
	};
}
