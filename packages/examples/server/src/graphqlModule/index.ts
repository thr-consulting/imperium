import debug from 'debug';
import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import type {Context} from '~core/context';
import Sample from './Sample.graphqls';
import {resolvers} from './myResolvers';

const d = debug('imperium.examples.server.graphqlModule');

/*
	This is an example of a server module that uses graphql.

	The ImperiumGraphqlServerModule type extends the base server module type to include
	schema, resolvers and schemaDirectives (not shown here).
 */

export const graphqlModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Server Module with GraphQL',
	schema: [Sample],
	resolvers,
});
