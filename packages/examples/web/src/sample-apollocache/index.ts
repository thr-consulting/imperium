import loadable from '@loadable/component';
import type {ImperiumRouterClientModule} from '@imperium/router';

const ApolloCache = loadable<any>(() => import('./components/ApolloCache'));

export function sampleApolloCacheModule(): ImperiumRouterClientModule {
	return {
		name: 'Sample Apollo Cache Module',
		routes: [
			{
				path: '/sample-apollocache',
				content: ApolloCache,
			},
		],
	};
}
