// Define server modules that should be included in the server.
import debug from 'debug';
import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import {advancedModule} from '../advancedModule';
import {basicModule} from '../basicModule';
import {graphqlModule} from '../graphqlModule';
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
		// TODO this technically creates another Auth instance but satisfies AuthDomain types
		authServerModule((ctx: Context) => ctx.domainAdvanced.context.AuthModel.create(ctx.domainAdvanced)),
		basicModule(),
		advancedModule(),
		graphqlModule(),
	];
}
