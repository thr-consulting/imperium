import {graphqlClientModule} from '@imperium/graphql-client';
import {authClientModule} from '@imperium/auth-client';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import type {ImperiumClientModule} from '@imperium/client';
import {sampleModule} from '../sample';
import {sampleGraphqlModule} from '../sample-graphql';
import {sampleAuthModule} from '../sample-auth';
import {sampleApolloCacheModule} from '../sample-apollocache';

export function clientModules(): ImperiumClientModule[] {
	return [
		graphqlClientModule(),
		routerClientModule(),
		stateClientModule(),
		authClientModule(),
		sampleModule(),
		sampleGraphqlModule(),
		sampleAuthModule(),
		sampleApolloCacheModule(),
	];
}
