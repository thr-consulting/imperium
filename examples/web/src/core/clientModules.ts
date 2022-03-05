import type {ImperiumClientModule} from '@imperium/client';
// import {authClientModule, authorizationEndpointLookup} from '@imperium/auth-client';
import {graphqlClientModule} from '@imperium/graphql-client';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
// import {layoutClientModule} from '@imperium/layout';
import {sampleModule} from '../sample';

export function clientModules(): ImperiumClientModule[] {
	return [
		// authClientModule({permissionLookup: authorizationEndpointLookup}),
		graphqlClientModule(),
		routerClientModule(),
		stateClientModule(),
		// layoutClientModule(),
		sampleModule(),
	];
}
