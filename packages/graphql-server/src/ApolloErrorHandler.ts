import debug from 'debug';
import log from 'winston';
import type {ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener} from 'apollo-server-plugin-base';

const d = debug('imperium.graphql-server.ApolloErrorHandler');

export const ApolloErrorHandler: ApolloServerPlugin = {
	requestDidStart(): GraphQLRequestListener {
		return {
			didEncounterErrors(requestContext: GraphQLRequestContext) {
				requestContext.errors?.forEach(error => {
					// eslint-disable-next-line no-underscore-dangle
					log.error(error.message, {error, session: requestContext.context.__session, group: 'graphql'});
				});
			},
		};
	},
};
