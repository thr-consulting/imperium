import type {ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener} from 'apollo-server-plugin-base';
import debug from 'debug';
import type {ImperiumGraphqlLogErrorFn, ImperiumGraphqlLogRequestFn} from './types';

const d = debug('imperium.graphql-server.ApolloErrorHandler');

export function apolloErrorHandler<T>(logError?: ImperiumGraphqlLogErrorFn<T>, logRequest?: ImperiumGraphqlLogRequestFn<T>): ApolloServerPlugin {
	return {
		requestDidStart(reqContext): GraphQLRequestListener {
			if (logRequest) logRequest(reqContext as GraphQLRequestContext<T>);

			return {
				didEncounterErrors(requestContext: GraphQLRequestContext) {
					requestContext.errors?.forEach(error => {
						const err = error.originalError || error;
						d(err);
						// eslint-disable-next-line no-underscore-dangle
						if (logError) logError(err, requestContext.context.__session, requestContext.context as T);
						// eslint-disable-next-line no-param-reassign,no-underscore-dangle
						(err as any).session = requestContext.context.__session;
					});
				},
			};
		},
	};
}
