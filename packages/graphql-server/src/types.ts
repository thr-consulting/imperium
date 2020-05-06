import {Connector} from '@imperium/context-manager';
import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import {DocumentNode} from 'graphql';
import {IResolvers, SchemaDirectiveVisitor} from 'graphql-tools';

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
