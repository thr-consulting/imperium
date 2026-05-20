import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';
import {makeExecutableSchema} from '@graphql-tools/schema';
import type {IResolvers} from '@graphql-tools/utils';
import type {ImperiumServer} from '@imperium/server';
import debug from 'debug';
import {resolvers as coreResolvers, schema as coreSchema} from './schema';
import {isImperiumGraphqlServerModule} from './types';

const d = debug('imperium.graphql-server.makeSchema');

interface MakeSchemaOpts {
	server: ImperiumServer<any>;
}

export function makeSchema<T>({server}: MakeSchemaOpts) {
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
	return makeExecutableSchema({
		typeDefs,
		resolvers,
	});
}
