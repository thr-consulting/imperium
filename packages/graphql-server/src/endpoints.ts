import type {ImperiumServer} from '@imperium/server';
import {compose} from '@imperium/server';
import {Environment, getCorsOrigin} from '@thx/env';
import {ConnectionContext, ServerOptions, SubscriptionServer} from 'subscriptions-transport-ws';
import {makeExecutableSchema} from '@graphql-tools/schema';
import compact from 'lodash/compact';
import {execute, subscribe} from 'graphql';
import type {ApolloServerExpressConfig, CorsOptions, ExpressContext} from 'apollo-server-express';
import {ApolloServer} from 'apollo-server-express';
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';
import type {IResolvers} from '@graphql-tools/utils';
import bodyParser from 'body-parser';
import debug from 'debug';
import {apolloErrorHandler} from './ApolloErrorHandler';
import {resolvers as coreResolvers, schema as coreSchema} from './schema';
import {GraphqlServerModuleConfig, isImperiumGraphqlServerModule} from './types';

const d = debug('imperium.graphql-server.endpoints');

/**
 * Apollo graphql Express endpoints
 * @param config
 */
export function endpoints<T>(config?: GraphqlServerModuleConfig<T>) {
	return async (server: ImperiumServer<any>): Promise<void> => {
		const isDevelopment = Environment.isDevelopment();
		const graphqlUrl = Environment.getString('GRAPHQL_URL');
		const enableSubscriptions = Environment.getBool('GRAPHQL_ENABLE_SUBSCRIPTIONS');
		const graphqlBodyLimit = Environment.getString('GRAPHQL_BODY_LIMIT');

		// Merge all the typeDefs from all modules
		d('Merging graphql schema');
		const typeDefs = mergeTypeDefs(
			server.modules.reduce((memo, module) => {
				if (isImperiumGraphqlServerModule(module) && module.schema) {
					if (Array.isArray(module.schema)) {
						return [...memo, ...module.schema];
					}
					return [...memo, module.schema];
				}
				return memo;
			}, coreSchema),
		);

		// There is a bug where Babel's cache is not invalidated if a graphqls file changes.
		// This is being addressed in https://github.com/babel/babel/issues/8497.
		// For now, I've disabled the @babel/register cache in `dev.js` in @imperium/dev.

		// Get all the resolvers from all modules
		d('Merging graphql resolvers');
		const resolversArray = server.modules.reduce(
			(memo, module) => {
				if (isImperiumGraphqlServerModule(module) && module.resolvers) {
					const resolvers1 = module.resolvers(server);
					if (Array.isArray(resolvers1)) {
						return [...memo, ...resolvers1];
					}
					return [...memo, resolvers1];
				}
				return memo;
			},
			[coreResolvers],
		);
		// @ts-ignore I cannot get the types for IResolver to line up. -mk
		const resolvers = mergeResolvers<any, T>(resolversArray) as IResolvers;

		// Create the schema from typeDefs and resolvers.
		const schema = makeExecutableSchema({
			typeDefs,
			resolvers,
		});

		let subscriptionShutdownPlugin = null;
		if (enableSubscriptions) {
			d('Installing subscription handlers');
			const apollSubscriptionServerConfig: ServerOptions = {
				schema,
				execute,
				subscribe,
				async onConnect(connectionParams: Record<string, unknown>, webSocket: WebSocket, context: ConnectionContext) {
					d(connectionParams);
					// d(webSocket);
					// d(context);
					return server.createContext();
				},
			};

			const subscriptionServer = SubscriptionServer.create(apollSubscriptionServerConfig, {
				server: server.httpServer,
				path: graphqlUrl,
			});

			subscriptionShutdownPlugin = {
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			};
		}

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
			// playground: isDevelopment,
			debug: isDevelopment,
			introspection: isDevelopment,
			// tracing: isDevelopment,
			plugins: compact([apolloErrorHandler<T>(config?.logError, config?.logRequest), subscriptionShutdownPlugin]),
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
