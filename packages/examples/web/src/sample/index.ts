import loadable from '@loadable/component';
import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumStateClientModule} from '@imperium/state/src';

const HelloWorld = loadable<any>(() => import('./components/HelloWorld'));

export function sampleModule(): ImperiumRouterClientModule & ImperiumStateClientModule {
	return {
		name: 'Sample',
		routes: [
			{
				path: '/sample',
				content: HelloWorld,
			},
		],
	};
}
