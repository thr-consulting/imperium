import ImperiumServer from '@imperium/core/src/server';
import debug from 'debug';
import jwt from 'express-jwt';
import cors from 'cors';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import compact from 'lodash/compact';
import {ApolloServer, SchemaDirectiveVisitor} from 'apollo-server-express';
import merge from 'lodash/merge';
import {DocumentNode} from 'graphql';
import {schema as coreSchema, resolvers as coreResolvers} from './schema';

const d = debug('imperium.graphql.endpoints');

export default function endpoints(server: ImperiumServer): void {
	// Merge all the typeDefs from all modules
	d('Merging graphql schema');
	const typeDefs = server.modules.reduce(
		(memo, module): DocumentNode[] => {
			if (module.schema) {
				if (isArray(module.schema)) {
					return [...memo, ...(module.schema as DocumentNode[])];
				}
				if (isString(module.schema)) {
					return [...memo, module.schema];
				}
			}
			return memo;
		},
		[...coreSchema],
	);

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

	// Merge all the resolvers from all modules
	d('Merging graphql resolvers');
	const resolvers = server.modules.reduce((memo, module) => {
		if (module.resolvers && isObject(module.resolvers)) return merge(memo, module.resolvers);
		return memo;
	}, coreResolvers);

	// Create apollo graphql server
	d('Creating apollo server');
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		// @ts-ignore
		context: ({req}) => req.context, // Context is stored in req. It is created in the contextMiddleware() from core
		schemaDirectives,
		formatError: error => {
			// TODO Do more here
			// eslint-disable-next-line no-console
			console.error(error);
			return error;
		},
	});

	d('Adding graphql endpoint');
	server.app.use(
		server.options.graphqlUrl,
		// @ts-ignore
		compact([
			cors({
				origin: 'http://localhost:4000',
			}),
			jwt({
				secret: server.options.accessTokenSecret,
				credentialsRequired: server.options.production, // On production, credentials are required
			}),
			server.middleware.contextMiddleware(),
			server.middleware.userAuthMiddleware ? server.middleware.userAuthMiddleware() : undefined,
		]),
	);

	apolloServer.applyMiddleware({
		app: server.app,
		path: server.options.graphqlUrl,
	});
}
