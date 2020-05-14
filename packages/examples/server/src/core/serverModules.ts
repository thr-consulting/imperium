// Define server modules that should be included in the server.
import debug from 'debug';
import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import type {Request} from 'express';
import {authDomainBridge} from '../domain3';
import {advancedModule} from '../advancedModule';
import {basicModule} from '../basicModule';
import {graphqlModule} from '../graphqlModule';

const d = debug('imperium.examples.server.serverModules');

/*
	Here is a factory function that returns an array of server modules that we
	want included in our app. Some modules require additional configuration.
*/
export function serverModules(): ImperiumServerModule<any, any>[] {
	return [
		graphqlServerModule({
			middleware: [authMiddleware({credentialsRequired: false})],
			apolloContextCreator: (req: Request) => {
				return {
					// @ts-ignore
					auth: req.auth,
				};
			},
		}),
		authServerModule(authDomainBridge()),
		basicModule(),
		advancedModule(),
		graphqlModule(),
	];
}
