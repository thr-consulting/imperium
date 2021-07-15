import type {ImperiumStateClientModule} from '@imperium/state/src';
import type {ImperiumRouterClientModule} from '@imperium/router';
import {state} from './state';
import StateExample from './components/StateExample';

export function sampleStateModule(): ImperiumStateClientModule & ImperiumRouterClientModule {
	return {
		name: 'StateSample',
		state,
		routes: [
			{
				path: '/state',
				content: StateExample,
			},
		],
	};
}
