import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import type {ExpressContext} from 'apollo-server-express/dist/ApolloServer';
import type {RequestHandler} from 'express';
import type {DocumentNode, GraphQLError} from 'graphql';
import type {IResolvers, SchemaDirectiveVisitor} from 'graphql-tools';

/**
 * Schema from Graphqls files.
 */
export type ApolloSchema = DocumentNode | DocumentNode[] | string | string[];

export type {IResolvers, IResolverObject, IFieldResolver} from 'graphql-tools';

/**
 * The configuration object for the graphql server module.
 */
export interface GraphqlServerModuleConfig {
	middleware?: RequestHandler[];
	apolloContextCreator?: (expContext: ExpressContext) => Record<string, any>;
	formatError?: (error: GraphQLError) => Error;
}

/**
 * The interface for a module that provides graphql functionality.
 */
export interface ImperiumGraphqlServerModule<Context> extends ImperiumServerModule<Context> {
	resolvers: (server: ImperiumServer<Context>) => IResolvers<any, Context>;
	schema: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
}

/**
 * Typeguard to check if a module is a graphql server module.
 * @param object
 */
export function isImperiumGraphqlServerModule<Context>(object: ImperiumServerModule<Context>): object is ImperiumGraphqlServerModule<Context> {
	// @ts-ignore
	return object.resolvers && typeof object.resolvers === 'function' && object.schema;
}
