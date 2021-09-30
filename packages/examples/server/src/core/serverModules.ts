import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {Authentication} from '@imperium/example-domain';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import {voyagerServerModule} from '@imperium/voyager';
import {Environment} from '@thx/env';
import type {ExcludeFalse} from '@thx/util';
// Define server modules that should be included in the server.
import debug from 'debug';
import {basicModule} from '~basicModule/index';
import type {Context} from '~core/context';
import {advancedModule} from '../advancedModule';
import {apolloCacheModule} from '../apolloCacheModule';
import {graphqlModule} from '../graphqlModule';
import {subscriptionModule} from '../subscriptionModule';

const d = debug('imperium.examples.examples/server.core.serverModules');

/*
	Server modules are created with a factory function that returns an array of
	server modules that we want included in our app.
	Some modules require additional configuration.
*/
export function serverModules(): ImperiumServerModule<any>[] {
	return [
		graphqlServerModule({
			middleware: [authMiddleware({credentialsRequired: Environment.getBool('GRAPHQL_CREDENTIALS_REQUIRED')})],
		}),
		authServerModule((ctx: Context) => new Authentication(ctx)),
		basicModule(),
		advancedModule(),
		graphqlModule(),
		Environment.getBool('GRAPHQL_ENABLE_SUBSCRIPTIONS') && subscriptionModule(),
		apolloCacheModule(),
		voyagerServerModule(),
	].filter(Boolean as any as ExcludeFalse);
}
