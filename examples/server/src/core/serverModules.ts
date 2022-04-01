import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {Authentication} from '@imperium/example-domain';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import {voyagerServerModule} from '@imperium/voyager';
import {env} from '@thx/env';
import type {ExcludeFalse} from '@thx/util';
import debug from 'debug';
import {basicModule} from '~basicModule/index';
import type {Context} from '~core/context';
import {advancedModule} from '../advancedModule';
import {apolloCacheModule} from '../apolloCacheModule';
import {authModule} from '../authModule';
import {graphqlModule} from '../graphqlModule';
import {subscriptionModule} from '../subscriptionModule';
import {userModule} from '../userModule';

const d = debug('imperium.server.core.serverModules');

/*
	Server modules are created with a factory function that returns an array of
	server modules that we want included in our app.
	Some modules require additional configuration.
*/
export function serverModules(): ImperiumServerModule<any>[] {
	return [
		authServerModule((ctx: Context) => new Authentication(ctx)),
		graphqlServerModule({
			middleware: [authMiddleware({credentialsRequired: env.getBool('GRAPHQL_CREDENTIALS_REQUIRED', false)})],
		}),
		voyagerServerModule(),
		userModule(),
		basicModule(),
		advancedModule(),
		graphqlModule(),
		env.getBool('GRAPHQL_ENABLE_SUBSCRIPTIONS', false) && subscriptionModule(),
		apolloCacheModule(),
		authModule(),
	].filter(Boolean as any as ExcludeFalse);
}
