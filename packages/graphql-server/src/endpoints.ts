import {isString} from '@thx/util';
import bodyParser from 'body-parser';
import {ApolloServer, ApolloServerExpressConfig, CorsOptions, gql, SchemaDirectiveVisitor} from 'apollo-server-express';
import debug from 'debug';
import {compose} from '@imperium/server';
import merge from 'lodash/merge';
import type {ImperiumServer} from '@imperium/server';
import type {ExpressContext} from 'apollo-server-express/dist/ApolloServer';
import type {DocumentNode} from 'graphql';
import {environment} from './environment';
import {resolvers as coreResolvers, schema as coreSchema} from './schema';
import {ApolloSchema, isImperiumGraphqlServerModule, GraphqlServerModuleConfig} from './types';
import {ApolloErrorHandler} from './ApolloErrorHandler';

const d = debug('imperium.graphql-server.endpoints');
const env = environment();

/**
 * Transforms the various types of ApolloSchema into an array of DocumentNode.
 * @param schema
 */
function transformToSchemaObjectArray(schema: ApolloSchema): DocumentNode[] {
	if (Array.isArray(schema)) {
		return (schema as Array<DocumentNode | string>).map(s => {
			if (isString(s)) {
				return gql`
					${s}
				`;
			}
			return s;
		});
	}
	if (isString(schema)) {
		return [
			gql`
				${schema}
			`,
		];
	}

	// Else it's just a DocumentNode (because of typescript)
	return [schema];
}

/**
 * Apollo graphql Express endpoints
 * @param config
 */
export function endpoints(config?: GraphqlServerModuleConfig) {
	return (server: ImperiumServer<any, any>): void => {
		// Merge all the typeDefs from all modules
		d('Merging graphql schema');
		const typeDefs = server.modules.reduce(
			(memo, module) => {
				if (isImperiumGraphqlServerModule(module) && module.schema) {
					return [...memo, ...transformToSchemaObjectArray(module.schema)];
				}
				return memo;
			},
			[...coreSchema],
		);

		// There is a bug where Babel's cache is not invalidated if a graphqls file changes.
		// This is being addressed in https://github.com/babel/babel/issues/8497.
		// For now, I've disabled the @babel/register cache in `dev.js` in @imperium/dev.

		// Merge all the schema directives from all modules
		d('Merging graphql schema directives');
		const schemaDirectives = server.modules.reduce((memo, module) => {
			if (isImperiumGraphqlServerModule(module) && module.schemaDirectives) {
				return {
					...memo,
					...module.schemaDirectives,
				};
			}
			return memo;
		}, {} as Record<string, typeof SchemaDirectiveVisitor>);

		// Merge all the resolvers from all modules
		d('Merging graphql resolvers');
		const resolvers = server.modules.reduce((memo, module) => {
			if (isImperiumGraphqlServerModule(module) && module.resolvers) return merge(memo, module.resolvers(server));
			return memo;
		}, coreResolvers);

		const apolloServerConfig: ApolloServerExpressConfig = {
			typeDefs,
			resolvers,
			context: ({req, res, connection}: ExpressContext) => {
				if (connection) {
					// This is a subscription request and therefore we don't get a normal req and res (they are undefined).
					// So we will construct a middleware the same way we are below for normal requests.
					const subscriptionMiddleware = compose([...(config?.middleware || []), server.contextMiddleware()]);

					// We now execute the middleware by calling it in a promise.
					return new Promise((resolve, reject) => {
						// Since we don't have a req object we will create a "fake" one here and prime it with what would be
						// needed for authentication. We don't have any other identifying pieces of data so we can't supply
						// that here. Authorization headers are not required here.
						const customSubscriptionRequest = {
							headers: {
								authorization: connection.context.Authorization,
							},
							context: {}, // This will be filled in by the contextMiddleware
						};

						// Execute the actual middleware
						subscriptionMiddleware(customSubscriptionRequest as any, {} as any, (err?: any) => {
							if (err) {
								reject(err);
							} else if (config?.apolloContextCreator) {
								resolve({
									...customSubscriptionRequest.context,
									...config?.apolloContextCreator({req, res, connection}),
								});
							} else {
								resolve(customSubscriptionRequest.context);
							}
						});
					});
				}

				// If we have custom apollo context functions, run them here.
				if (config?.apolloContextCreator) {
					return {
						// @ts-ignore It's too much work to place "context" on the Request type.
						...req.context,
						...config?.apolloContextCreator({req, res, connection}),
					};
				}

				// @ts-ignore
				return req.context;
			},
			schemaDirectives,
			formatError: error => {
				if (config?.formatError) {
					return config.formatError(error);
				}
				return error;
			},
			playground: env.development,
			debug: env.development,
			introspection: env.development,
			tracing: env.development,
			plugins: [ApolloErrorHandler],
		};

		if (env.graphqlWs) {
			d('Configuring subscriptions');
			if (isString(env.graphqlUrl)) {
				apolloServerConfig.subscriptions = {
					path: env.graphqlUrl,
				};
			}
		}

		d('Creating apollo server');
		const apolloServer = new ApolloServer(apolloServerConfig);

		d(`Adding graphql endpoint: ${env.graphqlUrl}`);

		// Add middleware to graphql endpoint. Optional middleware can be passed in via constructor config object.
		// preContext and postContext middleware could be a thing, if needed.
		server.expressApp.use(
			env.graphqlUrl,
			compose([bodyParser.json({limit: env.graphqlBodyLimit}), ...(config?.middleware || []), server.contextMiddleware()]),
		);

		const corsOpts: CorsOptions = {
			origin: env.graphqlCorsOrigin,
		};

		apolloServer.applyMiddleware({
			app: server.expressApp,
			path: env.graphqlUrl,
			cors: corsOpts,
		});

		if (env.graphqlWs) {
			d('Installing subscription handlers');
			apolloServer.installSubscriptionHandlers(server.httpServer);
		}
	};
}
