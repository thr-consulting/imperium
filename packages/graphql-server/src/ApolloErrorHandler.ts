import type {
	ApolloServerPlugin,
	BaseContext,
	GraphQLRequestContext,
	GraphQLRequestContextDidEncounterErrors,
	GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import debug from 'debug';
import type {ImperiumGraphqlLogErrorFn, ImperiumGraphqlLogRequestFn} from './types';

const d = debug('imperium.graphql-server.ApolloErrorHandler');

export function apolloErrorHandler<T>(logError?: ImperiumGraphqlLogErrorFn<T>, logRequest?: ImperiumGraphqlLogRequestFn<T>): ApolloServerPlugin {
	return {
		async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener | void> {
			if (logRequest) logRequest(requestContext as GraphQLRequestContext<T>);

			return {
				async didEncounterErrors(rC: GraphQLRequestContextDidEncounterErrors<BaseContext>): Promise<void> {
					rC.errors?.forEach(error => {
						const err = error.originalError || error;
						d(err);
						// eslint-disable-next-line no-underscore-dangle
						if (logError) logError(err, rC.context.__session, rC.context as T);
						// eslint-disable-next-line no-param-reassign,no-underscore-dangle
						(err as any).session = rC.context.__session;
					});
				},
			};
		},
	};
}
