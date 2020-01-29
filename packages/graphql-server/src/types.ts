import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor, IResolvers} from 'graphql-tools';
import {IContextManager, IImperiumServer} from '@imperium/server';

export type ApolloSchema = DocumentNode | DocumentNode[] | string | string[];

export {IResolvers, IResolverObject, IFieldResolver} from 'graphql-tools';

export interface ImperiumGraphqlServerModule {
	schema?: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
	// Errors will arise if the any is changed to object
	resolvers?: (server: IImperiumServer) => IResolvers<any, IContextManager>;
}
