import type {ImperiumLayoutClientModule} from '@imperium/layout';
import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumStateClientModule} from '@imperium/state';
import {layout} from './layout';
import {routeProps} from './pages';
import {state} from './state';

export function testDatahookModule(): ImperiumStateClientModule & ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'TestDatahook',
		state,
		routeProps,
		layout,
	};
}
