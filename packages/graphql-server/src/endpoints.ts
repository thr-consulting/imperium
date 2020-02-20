import {IImperiumServer, ImperiumServerModule} from '@imperium/server';
import {isString, toString} from '@imperium/util';
import debug from 'debug';
import {DocumentNode} from 'graphql';
import {ApolloServer, SchemaDirectiveVisitor, ApolloServerExpressConfig, gql, CorsOptions} from 'apollo-server-express';
import jwt from 'express-jwt';
import compact from 'lodash/compact';
import merge from 'lodash/merge';
import {schema as coreSchema, resolvers as coreResolvers} from './schema';
import {ApolloSchema, ImperiumGraphqlServerModule} from './types';

const d = debug('imperium.graphql-server.endpoints');

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

export default function endpoints(server: IImperiumServer): void {
	// Merge all the typeDefs from all modules
	d('Merging graphql schema');
	const typeDefs = server.modules.reduce(
		(memo, module: ImperiumServerModule & ImperiumGraphqlServerModule) => {
			if (module.schema) {
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
	const schemaDirectives = server.modules.reduce((memo, module: ImperiumServerModule & ImperiumGraphqlServerModule) => {
		if (module.schemaDirectives) {
			return {
				...memo,
				...module.schemaDirectives,
			};
		}
		return memo;
	}, {} as {[key: string]: typeof SchemaDirectiveVisitor});

	// Let's not create a pubsub here. The app should be in charge of that.
	// // Create PubSub for subscriptions
	// if (server.environment.graphqlWs) {
	// 	d('Creating graphql pub/sub');
	// 	const pubsub = new PubSub();
	// 	server.addEnvironment('graphqlPubSub', pubsub);
	// }

	// Merge all the resolvers from all modules
	d('Merging graphql resolvers');
	const resolvers = server.modules.reduce((memo, module: ImperiumServerModule & ImperiumGraphqlServerModule) => {
		if (module.resolvers) return merge(memo, module.resolvers(server));
		return memo;
	}, coreResolvers);

	const apolloServerConfig: ApolloServerExpressConfig = {
		typeDefs,
		resolvers,
		// @ts-ignore
		context: ({req, connection}) => {
			// ContextManager is stored in req. It is created in the contextMiddleware() from core
			if (connection) {
				return connection.context;
			}
			// @ts-ignore
			return req.contextManager;
		},
		schemaDirectives,
		formatError: error => {
			// TODO Do more here
			// eslint-disable-next-line no-console
			console.error(error);
			return error;
		},
		playground: !!server.environment.development,
		debug: !!server.environment.development,
		introspection: !!server.environment.development,
	};

	if (server.environment.graphqlWs) {
		d('Configuring subscriptions');
		if (isString(server.environment.graphqlUrl)) {
			apolloServerConfig.subscriptions = {
				path: server.environment.graphqlUrl,
			};
		}
	}

	d('Creating apollo server');
	const apolloServer = new ApolloServer(apolloServerConfig);

	d(
		`Adding graphql endpoint: ${server.environment.graphqlUrl} ${
			server.environment.graphqlCredentialsRequired ? '[Credentials required]' : '[Credentials NOT required]'
		}`,
	);
	server.expressApp.use(
		toString(server.environment.graphqlUrl),
		// @ts-ignore
		compact([
			jwt({
				secret: toString(server.environment.graphqlAccessTokenSecret),
				credentialsRequired: !!server.environment.graphqlCredentialsRequired,
			}),
			server.middleware.contextManagerMiddleware(),
			server.middleware.authMiddleware ? server.middleware.authMiddleware() : undefined,
		]),
	);

	apolloServer.applyMiddleware({
		app: server.expressApp,
		path: toString(server.environment.graphqlUrl),
		cors: server.environment.graphqlCors as CorsOptions,
	});

	if (server.environment.graphqlWs) {
		d('Installing subscription handlers');
		apolloServer.installSubscriptionHandlers(server.httpServer);
	}
}
