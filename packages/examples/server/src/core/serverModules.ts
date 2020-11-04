// Define server modules that should be included in the server.
import debug from 'debug';
import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {Authentication} from '@imperium/example-domain';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import type {ExcludeFalse} from '@thx/util';
import {basicModule} from '~basicModule/index';
import {advancedModule} from '../advancedModule';
import {graphqlModule} from '../graphqlModule';
import {authorizationModule} from '../authorizationModule';
import {demoDataModule} from '../demoData';
import type {Context} from './context';
import {environment} from './environment';
import {subscriptionModule} from '../subscriptionModule';
import {apolloCacheModule} from '../apolloCacheModule';

const d = debug('imperium.examples.server.serverModules');
const env = environment();

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
		env.subscriptions && subscriptionModule(),
		apolloCacheModule(),
	].filter((Boolean as any) as ExcludeFalse);
}
