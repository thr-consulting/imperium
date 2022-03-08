import {authClientModule, authorizationEndpointLookup} from '@imperium/auth-client';
import type {ImperiumClientModule} from '@imperium/client';
import {graphqlClientModule} from '@imperium/graphql-client';
import {layoutClientModule} from '@imperium/layout';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import {sampleModule} from '../sample';
import {sampleGraphqlModule} from '../sample-graphql';
import {sampleLayoutModule} from '../sample-layout';
import {sampleAuthModule} from '../sample-auth';
import {sampleStateModule} from '../sample-state';
import {sampleApolloCacheModule} from '../sample-apollocache';

export function clientModules(): ImperiumClientModule[] {
	return [
		authClientModule({permissionLookup: authorizationEndpointLookup}),
		graphqlClientModule(),
		routerClientModule(),
		stateClientModule(),
		layoutClientModule(),
		sampleModule(),
		sampleGraphqlModule(),
		sampleAuthModule(),
		sampleApolloCacheModule(),
		sampleStateModule(),
		sampleLayoutModule(),
	];
}
