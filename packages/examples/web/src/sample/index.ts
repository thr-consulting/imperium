import loadable from '@loadable/component';
import {ImperiumClientModule} from '@imperium/client';
import {ImperiumRouterClientModule} from '@imperium/router';
// These were the static routes
// import HelloWorld from './client/HelloWorld';

// These are the dynamic routes
const HelloWorld = loadable(() => import('./components/HelloWorld'));
const GraphqlTest = loadable(() => import('./components/GraphqlTest'));

export default function sample(): ImperiumClientModule & ImperiumRouterClientModule {
	return {
		name: 'Sample',
		routes: [
			{
				path: '/sample',
				content: HelloWorld,
			},
			{
				path: '/graphqltest',
				content: GraphqlTest,
			},
		],
	};
}
