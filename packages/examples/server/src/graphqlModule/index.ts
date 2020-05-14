import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {connectors} from '../core/connectors';
// import type {MyApolloContext} from '../core/serverModules';
import Sample from './Sample.graphqls';
import type {Context} from '../core/context';

const d = debug('imperium.example-server2.graphqlModule');

export const graphqlModule = (): ImperiumGraphqlServerModule<Context, typeof connectors> => ({
	name: 'Server Module with GraphQL',
	schema: [Sample],
	resolvers(server) {
		return {
			Query: {
				// apolloContext.context.
				getData(obj, value, apolloContext) {
					d('getData');
					d(apolloContext.domain2.anything);
					// apolloContext.domain1.context.MyModel1
					// const {MyDataLoader1, MyModel1} = apolloContext.context.domain1.context;
					// d(apolloContext.auth.id);
					return 5;
				},
			},
		};
	},
});
