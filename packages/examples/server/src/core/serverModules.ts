// Define server modules that should be included in the server.
import {ApolloContext as AuthApolloContext, authMiddleware, authServerModule} from '@imperium/auth-server';
import {ApolloContext as GraphqlApolloContext, graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import type {Request} from 'express';
import {advancedModule} from '../advancedModule';
import {basicModule} from '../basicModule';
import {graphqlModule} from '../graphqlModule';
import {authDomainBridge} from './authDomainBridge';
import type {Context} from './context';

export type MyApolloContext = GraphqlApolloContext<Context> & AuthApolloContext;

export function serverModules(): ImperiumServerModule<any, any>[] {
	return [
		graphqlServerModule({
			middleware: [
				authMiddleware({
					credentialsRequired: false,
				}),
			],
			contextMaker: (req: Request) => {
				return {
					// @ts-ignore
					auth: req.auth,
				};
			},
		}),
		authServerModule(authDomainBridge()),
		basicModule,
		advancedModule,
		graphqlModule,
	];
}
