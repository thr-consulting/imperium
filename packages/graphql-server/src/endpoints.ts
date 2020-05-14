import {isString} from '@imperium/util';
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
	return (server: ImperiumServer<any, any>) => {
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

		// TODO There is a bug where Babel's cache is not invalidated if a graphqls file changes.
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

		// Let's not create a pubsub here. The app should be in charge of that.
		// // Create PubSub for subscriptions
		// if (env.graphqlWs) {
		// 	d('Creating graphql pub/sub');
		// 	const pubsub = new PubSub();
		// 	server.addEnvironment('graphqlPubSub', pubsub);
		// }

		// Merge all the resolvers from all modules
		d('Merging graphql resolvers');
		const resolvers = server.modules.reduce((memo, module) => {
			if (isImperiumGraphqlServerModule(module) && module.resolvers) return merge(memo, module.resolvers(server));
			return memo;
		}, coreResolvers);

		const apolloServerConfig: ApolloServerExpressConfig = {
			typeDefs,
			resolvers,
			context: ({req /* , connection */}: ExpressContext) => {
				// This is ApolloContext!

				// TODO check into why I was using connection... probably subscribe
				// if (connection) {
				// 	return connection.context;
				// }

				if (config?.apolloContextCreator) {
					return {
						// @ts-ignore
						...req.context,
						...config?.apolloContextCreator(req),
					};
				}

				// @ts-ignore
				return req.context;
			},
			schemaDirectives,
			formatError: error => {
				// TODO Do more here
				// eslint-disable-next-line no-console
				console.error(error);
				d(error);
				return error;
			},
			playground: !!env.development,
			debug: !!env.development,
			introspection: !!env.development,
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
		server.expressApp.use(env.graphqlUrl, compose([...(config?.middleware || []), server.contextMiddleware()]));

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
