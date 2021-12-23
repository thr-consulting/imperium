import type {IResolvers} from '@graphql-tools/utils';
import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import type {ExpressContext} from 'apollo-server-express';
import type {GraphQLRequestContext} from 'apollo-server-types';
import type {RequestHandler} from 'express';
import type {DocumentNode, GraphQLError, GraphQLFormattedError} from 'graphql';

/**
 * Schema from Graphqls files.
 */
export type ImperiumGraphqlLogErrorFn<T> = (error: Error, session: string, ctx: T) => Promise<void>;
export type ImperiumGraphqlLogRequestFn<T> = (requestContext: GraphQLRequestContext<T>) => Promise<void>;

/**
 * The configuration object for the graphql server module.
 */
export interface GraphqlServerModuleConfig<T> {
	middleware?: RequestHandler[];
	apolloContextCreator?: (expContext: ExpressContext) => Record<string, any>;
	formatError?: (error: GraphQLError) => GraphQLFormattedError;
	logError?: ImperiumGraphqlLogErrorFn<T>;
	logRequest?: ImperiumGraphqlLogRequestFn<T>;
}

/**
 * The interface for a module that provides graphql functionality.
 */
export interface ImperiumGraphqlServerModule<Context> extends ImperiumServerModule<Context> {
	resolvers: (server: ImperiumServer<Context>) => IResolvers<any, Context> | IResolvers<any, Context>[];
	schema: DocumentNode | DocumentNode[];
}

/**
 * Typeguard to check if a module is a graphql server module.
 * @param object
 */
export function isImperiumGraphqlServerModule<Context>(object: ImperiumServerModule<Context>): object is ImperiumGraphqlServerModule<Context> {
	// @ts-ignore
	return object.resolvers && typeof object.resolvers === 'function' && object.schema;
}
