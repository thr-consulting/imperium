import {authClientModule} from '@imperium/auth-client';
import type {ImperiumClientModule} from '@imperium/client';
import {graphqlClientModule} from '@imperium/graphql-client';
import {layoutClientModule} from '@imperium/layout';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import {sampleModule} from '../sample';
import {sampleApolloCacheModule} from '../sample-apollocache';
import {sampleAuthModule} from '../sample-auth';
import {sampleGraphqlModule} from '../sample-graphql';
import {sampleStateModule} from '../sample-state';

export function clientModules(): ImperiumClientModule[] {
	return [
		graphqlClientModule(),
		routerClientModule(),
		stateClientModule(),
		authClientModule(),
		layoutClientModule(),
		sampleModule(),
		sampleGraphqlModule(),
		sampleAuthModule(),
		sampleApolloCacheModule(),
		sampleStateModule(),
	];
}
