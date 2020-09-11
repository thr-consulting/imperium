import loadable from '@loadable/component';
import type {ImperiumRouterClientModule} from '@imperium/router';

const GraphqlTest = loadable<any>(() => import('./components/GraphqlTest'));

export function sampleGraphqlModule(): ImperiumRouterClientModule {
	return {
		name: 'Sample Graphql Module',
		routes: [
			{
				path: '/sample-graphql',
				content: GraphqlTest,
			},
		],
	};
}
