import type {ImperiumServer} from '@imperium/server';
import {compose} from '@imperium/server';
import {Environment, getCorsOrigin} from '@thx/env';
import {ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled} from 'apollo-server-core';
import type {ApolloServerExpressConfig, CorsOptions, ExpressContext} from 'apollo-server-express';
import {ApolloServer} from 'apollo-server-express';
import bodyParser from 'body-parser';
import debug from 'debug';
import {compact} from 'lodash-es';
import {apolloErrorHandler} from './ApolloErrorHandler';
import {createSubscriptionServer} from './createSubscriptionServer';
import {makeSchema} from './makeSchema';
import type {GraphqlServerModuleConfig} from './types';

const d = debug('imperium.graphql-server.endpoints');

/**
 * Apollo graphql Express endpoints
 * @param config
 */
export function endpoints<T>(config?: GraphqlServerModuleConfig<T>) {
	return async (server: ImperiumServer<any>): Promise<void> => {
		const isDevelopment = Environment.isDevelopment();
		const graphqlUrl = Environment.getString('IMP_GRAPHQL_URL');

		const graphqlBodyLimit = Environment.getString('IMP_GRAPHQL_BODY_LIMIT');

		const schema = makeSchema({server});

		const subscriptionShutdownPlugin = createSubscriptionServer({schema, server, graphqlUrl});

		const apolloServerConfig: ApolloServerExpressConfig = {
			schema,
			context: ({req, res}: ExpressContext) => {
				// If we have custom apollo context functions, run them here.
				if (config?.apolloContextCreator) {
					return {
						// @ts-ignore It's too much work to place "context" on the Request type.
						...req.context,
						...config?.apolloContextCreator({req, res}),
					};
				}

				// @ts-ignore
				return req.context;
			},
			formatError: error => {
				if (config?.formatError) {
					return config.formatError(error);
				}
				return error;
			},
			debug: isDevelopment,
			introspection: isDevelopment,
			plugins: compact([
				apolloErrorHandler<T>(config?.logError, config?.logRequest),
				subscriptionShutdownPlugin,
				isDevelopment ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled(),
			]),
		};

		d('Creating apollo server');
		const apolloServer = new ApolloServer(apolloServerConfig);

		d(`Adding graphql endpoint: ${graphqlUrl}`);

		// Add middleware to graphql endpoint. Optional middleware can be passed in via constructor config object.
		// preContext and postContext middleware could be a thing, if needed.
		server.expressApp.use(
			graphqlUrl,
			compose([bodyParser.json({limit: graphqlBodyLimit}), ...(config?.middleware || []), server.contextMiddleware()]),
		);

		const corsOpts: CorsOptions = {
			origin: getCorsOrigin(),
		};

		await apolloServer.start();

		apolloServer.applyMiddleware({
			app: server.expressApp,
			path: graphqlUrl,
			cors: corsOpts,
		});
	};
}
