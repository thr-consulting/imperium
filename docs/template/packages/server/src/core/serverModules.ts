import {authMiddleware, authServerModule} from '@imperium/auth-server';
import {graphqlServerModule} from '@imperium/graphql-server';
import type {ImperiumServerModule} from '@imperium/server';
import {voyagerServerModule} from '@imperium/voyager';
import {Environment} from '@thx/env';
import {getConnector} from '~core/connectors';
import {Authentication} from './Authentication';
import type {Context} from './createDomain';
import {sampleModule} from '../sample';

export function serverModules(): ImperiumServerModule<Context>[] {
	return [
		graphqlServerModule({
			middleware: [authMiddleware({credentialsRequired: Environment.getBool('GRAPHQL_CREDENTIALS_REQUIRED')})],
		}) as ImperiumServerModule<Context>,
		authServerModule((ctx: Context) => {
			return new Authentication({cache: getConnector('cache', ctx.connectors)});
		}),
		voyagerServerModule(),
		sampleModule(),
	];
}
