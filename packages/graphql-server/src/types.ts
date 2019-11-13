import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor, IResolvers} from 'graphql-tools';
import {IImperiumServer} from '@imperium/server';

export type ApolloSchema = DocumentNode | DocumentNode[] | string | string[];

export interface ImperiumGraphqlServerModule {
	schema?: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
	resolvers?: (server: IImperiumServer) => {[key: string]: IResolvers};
}
