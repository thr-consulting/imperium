import debug from 'debug';
import {EndpointOptions} from '@imperium/core';
import jwt from 'express-jwt';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import {ApolloServer, SchemaDirectiveVisitor} from 'apollo-server-express';
import merge from 'lodash/merge';
import {DocumentNode} from 'graphql';
import {schema as coreSchema, resolvers as coreResolvers} from '../schema';

const d = debug('imperium.graphql.endpoints.graphql');

export default function({app, connectors, modules, middleware}: EndpointOptions): void {
	// Merge all the typeDefs from all modules
	d('Merging graphql schema');
	const typeDefs = modules.reduce((memo, module): DocumentNode[] => {
		if (module.schema) {
			if (isArray(module.schema)) {
				return [...memo, ...module.schema as DocumentNode[]];
			}
			if (isString(module.schema)) {
				// @ts-ignore
				return [...memo, module.schema];
			}
		}
		return memo;
	}, [...coreSchema]);

	// Merge all the schema directives from all modules
	d('Merging graphql schema directives');
	type RecordSDV = Record<string, typeof SchemaDirectiveVisitor>;
	const schemaDirectives = modules.reduce((memo: RecordSDV, module): RecordSDV => {
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
	const resolvers = modules.reduce((memo, module) => {
		if (module.resolvers && isObject(module.resolvers)) return merge(memo, module.resolvers);
		return memo;
	}, coreResolvers);

	// Create apollo graphql server
	d('Creating apollo server');
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		// @ts-ignore
		context: ({req}) => req.context, // Context is stored in req. It is created in the contextMiddleware() method below.
		schemaDirectives,
		formatError: error => {
			// TODO Do more here
			// eslint-disable-next-line no-console
			console.error(error);
			return error;
		},
	});

	d('Adding graphql endpoint');
	// Mount a bunch of middleware onto /api/graphql
	app.use(
		'/api/graphql',
		jwt({
			secret: process.env.JWT_SECRET || 'notsecure',
			credentialsRequired: false,
		}),
		middleware.contextMiddleware({connectors, modules}),
		middleware.userAuthMiddleware(),
	);

	apolloServer.applyMiddleware({
		app,
		path: '/api/graphql',
	});
}
