import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/context';
import Sample from './Sample.graphqls';

const d = debug('imperium.examples.server.graphqlModule');

export const graphqlModule = (): ImperiumGraphqlServerModule<Context, typeof connectors> => ({
	name: 'Server Module with GraphQL',
	schema: [Sample],
	resolvers(server) {
		return {
			Query: {
				async getData(obj, value, apolloContext) {
					d('getData');
					const a = await apolloContext.domainAdvanced.context.SecureModel.getSecureData('thing', apolloContext.domainAdvanced);
					d(a);
					return 5;
				},
			},
		};
	},
});
