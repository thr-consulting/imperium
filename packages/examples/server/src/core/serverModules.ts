// Define server modules that should be included in the server.
import debug from 'debug';
import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {Authentication} from '@imperium/example-domain';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import {basicModule} from '../basicModule';
import {advancedModule} from '../advancedModule';
import {graphqlModule} from '../graphqlModule';
import {authorizationModule} from '../authorizationModule';
import {demoDataModule} from '../demoData';
import type {Context} from './context';

const d = debug('imperium.examples.server.serverModules');

/*
	Server modules are created with a factory function that returns an array of
	server modules that we want included in our app.
	Some modules require additional configuration.
*/
export function serverModules(): ImperiumServerModule<any, any>[] {
	return [
		graphqlServerModule({
			middleware: [authMiddleware({credentialsRequired: false})],
		}),
		authServerModule((ctx: Context) => new Authentication(ctx)),
		demoDataModule(),
		basicModule(),
		advancedModule(),
		graphqlModule(),
		authorizationModule(),
	];
}
