import ImperiumServer from '@imperium/core/src/server';
import debug from 'debug';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import {ApolloServer, SchemaDirectiveVisitor} from 'apollo-server-express';
import merge from 'lodash/merge';
import {DocumentNode} from 'graphql';
import {schema as coreSchema, resolvers as coreResolvers} from './schema';

const d = debug('imperium.graphql.insecureEndpoints');

export default function insecureEndpoints(server: ImperiumServer): void {
	// Merge all the typeDefs from all modules
	d('Merging insecure graphql schema');
	const typeDefs = server.modules.reduce(
		(memo, module): DocumentNode[] => {
			if (module.insecureSchema) {
				if (isArray(module.insecureSchema)) {
					return [...memo, ...(module.insecureSchema as DocumentNode[])];
				}
				if (isString(module.insecureSchema)) {
					// @ts-ignore
					return [...memo, module.insecureSchema];
				}
			}
			return memo;
		},
		[...coreSchema],
	);

	// Merge all the schema directives from all modules
	d('Merging insecure graphql schema directives');
	type RecordSDV = {[key: string]: typeof SchemaDirectiveVisitor};
	const schemaDirectives = server.modules.reduce((memo: RecordSDV, module): RecordSDV => {
		if (module.insecureSchemaDirectives && isObject(module.insecureSchemaDirectives)) {
			return {
				...memo,
				...module.insecureSchemaDirectives,
			};
		}
		return memo;
	}, {});

	// Merge all the resolvers from all modules
	d('Merging insecure graphql resolvers');
	const resolvers = server.modules.reduce((memo, module) => {
		if (module.insecureResolvers && isObject(module.insecureResolvers)) return merge(memo, module.insecureResolvers);
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

	d('Adding insecure graphql endpoint');
	// @ts-ignore
	server.app.use('/api/igraphql', server.middleware.contextMiddleware());

	apolloServer.applyMiddleware({
		app: server.app,
		path: '/api/igraphql',
	});
}
