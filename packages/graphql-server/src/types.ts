import type {Connector} from '@imperium/context-manager';
import type {ImperiumServer, ImperiumServerModule} from '@imperium/server';
import type {DocumentNode} from 'graphql';
import type {IResolvers, SchemaDirectiveVisitor} from 'graphql-tools';
import type {Request, RequestHandler} from 'express';

export type ApolloSchema = DocumentNode | DocumentNode[] | string | string[];

export type {IResolvers, IResolverObject, IFieldResolver} from 'graphql-tools';

export interface GraphqlServerModuleConfig {
	middleware?: RequestHandler[];
	contextMaker?: (req: Request) => Record<string, any>;
}

export interface ImperiumGraphqlServerModule<ApolloContext, Connectors extends Connector> extends ImperiumServerModule<ApolloContext, Connectors> {
	resolvers: (server: ImperiumServer<ApolloContext, Connectors>) => IResolvers<any, ApolloContext>;
	schema: ApolloSchema;
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
}

export interface ApolloContext<Context> {
	context: Context;
}

export function isImperiumGraphqlServerModule<Context, Connectors extends Connector>(
	object: ImperiumServerModule<Context, Connectors>,
): object is ImperiumGraphqlServerModule<Context, Connectors> {
	// @ts-ignore
	return object.resolvers && typeof object.resolvers === 'function' && object.schema;
}
