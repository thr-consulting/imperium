// Define server modules that should be included in the server.
import type {Request} from 'express';
import type {ImperiumServerModule} from '@imperium/server';
import {graphqlServerModule, ApolloContext as GraphqlApolloContext} from '@imperium/graphql-server';
import {authMiddleware, ApolloContext as AuthApolloContext} from '@imperium/auth-server';
import {basicModule} from '../basicModule';
import {advancedModule} from '../advancedModule';
import {graphqlModule} from '../graphqlModule';
import type {Context} from './server';
import {authDomainBridge} from './authDomainBridge';

export type MyApolloContext = GraphqlApolloContext<Context> & AuthApolloContext;

export const serverModules: ImperiumServerModule<any, any>[] = [
	graphqlServerModule({
		middleware: [
			authMiddleware({
				requiredDomain: authDomainBridge,
			}),
		],
		contextMaker: (req: Request) => {
			return {
				// @ts-ignore
				auth: req.auth,
			};
		},
	}),
	basicModule,
	advancedModule,
	graphqlModule,
];
