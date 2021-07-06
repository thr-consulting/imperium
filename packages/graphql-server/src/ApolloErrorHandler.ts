import type {ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener} from 'apollo-server-plugin-base';
import debug from 'debug';
import type {ImperiumGraphqlLogErrorFn} from './types';

const d = debug('imperium.graphql-server.ApolloErrorHandler');

export function apolloErrorHandler(logError?: ImperiumGraphqlLogErrorFn): ApolloServerPlugin {
	return {
		requestDidStart(): GraphQLRequestListener {
			return {
				didEncounterErrors(requestContext: GraphQLRequestContext) {
					requestContext.errors?.forEach(error => {
						d(error);
						// eslint-disable-next-line no-underscore-dangle
						if (logError) logError(error, requestContext.context.__session);
					});
				},
			};
		},
	};
}
