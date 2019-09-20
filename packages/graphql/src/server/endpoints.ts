import ImperiumServer from '@imperium/core/src/server';
import debug from 'debug';
import jwt from 'express-jwt';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import compact from 'lodash/compact';
import {ApolloServer, SchemaDirectiveVisitor, PubSub, ApolloServerExpressConfig, gql} from 'apollo-server-express';
import merge from 'lodash/merge';
import {schema as coreSchema, resolvers as coreResolvers} from './schema';

const d = debug('imperium.graphql.endpoints');

type SchemaString = string;
type SchemaObject = {[key: string]: any};
type SchemaArray = (SchemaString | SchemaObject)[];

function transformToSchemaObjectArray(schema: SchemaString | SchemaObject | SchemaArray): SchemaObject[] {
	if (isArray(schema)) {
		return schema.map(schem => {
			if (isObject(schem)) {
				return schem;
			}
			if (isString(schem)) {
				return gql`
					${schem}
				`;
			}
			throw new Error('Schema array contained a non-object or non-string');
		});
	}
	if (isObject(schema)) {
		return [schema];
	}
	if (isString(schema)) {
		return [
			gql`
				${schema}
			`,
		];
	}
	throw new Error('Schema must be an array, object or string');
}

export default function endpoints(server: ImperiumServer): void {
	// Merge all the typeDefs from all modules
	d('Merging graphql schema');
	const typeDefs = server.modules.reduce(
		// TODO figure out typescript
		(memo, module): any[] => {
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
	type RecordSDV = {[key: string]: typeof SchemaDirectiveVisitor};
	const schemaDirectives = server.modules.reduce((memo: RecordSDV, module): RecordSDV => {
		if (module.schemaDirectives && isObject(module.schemaDirectives)) {
			return {
				...memo,
				...module.schemaDirectives,
			};
		}
		return memo;
	}, {});

	// Create PubSub for subscriptions
	if (server.options.graphqlWs) {
		d('Creating graphql pub/sub');
		const pubsub = new PubSub();
		server.addOption('graphqlPubSub', pubsub);
	}

	// Merge all the resolvers from all modules
	d('Merging graphql resolvers');
	const resolvers = server.modules.reduce((memo, module) => {
		if (module.resolvers && isFunction(module.resolvers)) return merge(memo, module.resolvers(server));
		return memo;
	}, coreResolvers);

	const apolloServerConfig: ApolloServerExpressConfig = {
		typeDefs,
		resolvers,
		// @ts-ignore
		context: ({req, connection}) => {
			// Context is stored in req. It is created in the contextMiddleware() from core
			if (connection) {
				return connection.context;
			}
			// @ts-ignore
			return req.context;
		},
		schemaDirectives,
		formatError: error => {
			// TODO Do more here
			// eslint-disable-next-line no-console
			console.error(error);
			return error;
		},
		playground: server.options.development,
		debug: server.options.development,
		introspection: server.options.development,
	};

	if (server.options.graphqlWs) {
		d('Configuring subscriptions');
		apolloServerConfig.subscriptions = {
			path: server.options.graphqlUrl,
		};
	}

	d('Creating apollo server');
	const apolloServer = new ApolloServer(apolloServerConfig);

	d(
		`Adding graphql endpoint: ${server.options.graphqlUrl} ${
			server.options.graphqlCredentialsRequired ? '[Credentials required]' : '[Credentials NOT required]'
		}`,
	);
	server.app.use(
		server.options.graphqlUrl,
		// @ts-ignore
		compact([
			jwt({
				secret: server.options.graphqlAccessTokenSecret,
				credentialsRequired: server.options.graphqlCredentialsRequired,
			}),
			server.middleware.contextMiddleware(),
			server.middleware.userAuthMiddleware ? server.middleware.userAuthMiddleware() : undefined,
		]),
	);

	apolloServer.applyMiddleware({
		app: server.app,
		path: server.options.graphqlUrl,
		cors: server.options.graphqlCors,
	});

	if (server.options.graphqlWs) {
		d('Installing subscription handlers');
		apolloServer.installSubscriptionHandlers(server.server);
	}
}
