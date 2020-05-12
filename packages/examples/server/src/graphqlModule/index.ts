import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {connectors} from '../core/connectors';
import type {MyApolloContext} from '../core/serverModules';
import Sample from './Sample.graphqls';

const d = debug('imperium.example-server2.graphqlModule');

export const graphqlModule: ImperiumGraphqlServerModule<MyApolloContext, typeof connectors> = {
	name: 'Server Module with GraphQL',
	schema: [Sample],
	resolvers(server) {
		return {
			Query: {
				// apolloContext.context.
				getData(obj, value, apolloContext) {
					d('getData');
					d(apolloContext.auth);
					const {MyModel1} = apolloContext.context.domain1.context;
					// const {MyDataLoader1, MyModel1} = apolloContext.context.domain1.context;
					// d(apolloContext.auth.id);
					return 5;
				},
			},
		};
	},
};
