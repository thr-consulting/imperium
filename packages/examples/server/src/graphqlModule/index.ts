import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {Context} from '~core/context';
import Sample from './Sample.graphqls';

const d = debug('imperium.examples.server.graphqlModule');

/*
	This is an example of a server module that uses graphql.

	The ImperiumGraphqlServerModule type extends the base server module type to include
	schema, resolvers and schemaDirectives (not shown here).
 */

export const graphqlModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Server Module with GraphQL',
	schema: [Sample],
	resolvers(server) {
		return {
			Query: {
				async getData(/* obj, value, apolloContext */) {
					// The apollo context is technically different than imperium context but we spread imperium context across apollo context.
					// const data = apolloContext.scoreController
					// const fakeSecureData = apolloContext.SecureModel.getSecureData('secure-thing', apolloContext);
					// d(`Fake Secure Data: ${fakeSecureData}`);
					return 5;
				},
			},
		};
	},
});
