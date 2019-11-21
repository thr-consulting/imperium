import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor, IResolvers} from 'graphql-tools';
import {IImperiumServer} from '@imperium/server';

export type ApolloSchema = DocumentNode | DocumentNode[] | string | string[];

export type ImperiumResolvers = {[key: string]: IResolvers};

export interface ImperiumGraphqlServerModule {
	schema?: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
	resolvers?: (server: IImperiumServer) => ImperiumResolvers;
}
