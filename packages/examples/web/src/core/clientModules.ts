import {graphqlClientModule} from '@imperium/graphql-client';
import {authClientModule} from '@imperium/auth-client';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import {layoutClientModule} from '@imperium/layout';
import type {ImperiumClientModule} from '@imperium/client';
import {sampleModule} from '../sample';
import {sampleGraphqlModule} from '../sample-graphql';
import {sampleAuthModule} from '../sample-auth';
import {sampleApolloCacheModule} from '../sample-apollocache';
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
