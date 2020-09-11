import type {Connector} from '@imperium/connector';
import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import type {DocumentNode} from 'graphql';
import type {IResolvers, SchemaDirectiveVisitor} from 'graphql-tools';
import type {RequestHandler} from 'express';
import type {ExpressContext} from 'apollo-server-express/dist/ApolloServer';
import type {GraphQLError} from 'graphql';

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
export interface ImperiumGraphqlServerModule<Context, Connectors extends Connector> extends ImperiumServerModule<Context, Connectors> {
	resolvers: (server: ImperiumServer<Context, Connectors>) => IResolvers<any, Context>;
	schema: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
}

/**
 * Typeguard to check if a module is a graphql server module.
 * @param object
 */
export function isImperiumGraphqlServerModule<Context, Connectors extends Connector>(
	object: ImperiumServerModule<Context, Connectors>,
): object is ImperiumGraphqlServerModule<Context, Connectors> {
	// @ts-ignore
	return object.resolvers && typeof object.resolvers === 'function' && object.schema;
}
