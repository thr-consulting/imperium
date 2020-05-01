import {Connector} from '@imperium/context-manager';
import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor, IResolvers} from 'graphql-tools';
import type {default as ImperiumServer, ImperiumServerModule} from '@imperium/server';

export type ApolloSchema = DocumentNode | DocumentNode[] | string | string[];

export type {IResolvers, IResolverObject, IFieldResolver} from 'graphql-tools';

export interface ImperiumGraphqlServerModule<Context, Connectors extends Connector> extends ImperiumServerModule<Context, Connectors> {
	resolvers: (server: ImperiumServer<Context, Connectors>) => IResolvers<any, Context>;
	schema: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
}

export function isImperiumGraphqlServerModule<Context, Connectors extends Connector>(
	object: ImperiumServerModule<Context, Connectors>,
): object is ImperiumGraphqlServerModule<Context, Connectors> {
	// @ts-ignore
	return object.resolvers && typeof object.resolvers === 'function' && object.schema;
}
