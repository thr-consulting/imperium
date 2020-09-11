import loadable from '@loadable/component';
import type {ImperiumRouterClientModule} from '@imperium/router';

const HelloWorld = loadable<any>(() => import('./components/HelloWorld'));

export function sampleModule(): ImperiumRouterClientModule {
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
