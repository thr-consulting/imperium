// Define server modules that should be included in the server.
import type {Request} from 'express';
import type {ImperiumServerModule} from '@imperium/server';
import {graphqlServerModule, ApolloContext as GraphqlApolloContext} from '@imperium/graphql-server';
import {authMiddleware, ApolloContext as AuthApolloContext} from '@imperium/auth-server';
import {basicModule} from '../basicModule';
import {advancedModule} from '../advancedModule';
import {graphqlModule} from '../graphqlModule';
import type {Context} from './context';
import {authDomainBridge} from './authDomainBridge';
import {contextCreator} from './context';
import {connectors} from './connectors';

export type MyApolloContext = GraphqlApolloContext<Context> & AuthApolloContext;

export const serverModules: ImperiumServerModule<any, any>[] = [
	graphqlServerModule({
		middleware: [
			// authMiddleware({
			// 	requiredDomain: authDomainBridge(contextCreator(connectors)),
			// }),
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

const serverModulesFactory = () => {

};
