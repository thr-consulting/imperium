import {authClientModule, permissionEndpointLookup} from '@imperium/auth-client';
import {authGraphqlClientModule} from '@imperium/auth-graphql-client';
import type {ImperiumClientModule} from '@imperium/client';
import {graphqlClientModule} from '@imperium/graphql-client';
import {layoutClientModule} from '@imperium/layout';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import {sampleModule} from '../sample';
import {sampleAuthModule} from '../sample-auth';

export function clientModules(): ImperiumClientModule[] {
	return [
		authClientModule({permissionLookup: permissionEndpointLookup}),
		authGraphqlClientModule(),
		graphqlClientModule(),
		routerClientModule(),
		stateClientModule(),
		layoutClientModule(),
		sampleModule(),
		// sampleGraphqlModule(),
		sampleAuthModule(),
		// sampleApolloCacheModule(),
		// sampleStateModule(),
		// sampleLayoutModule(),
	];
}
