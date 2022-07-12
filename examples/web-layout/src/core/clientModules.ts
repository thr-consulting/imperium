import {authClientModule, authorizationEndpointLookup} from '@imperium/auth-client';
import type {ImperiumClientModule} from '@imperium/client';
import {graphqlClientModule} from '@imperium/graphql-client';
import {layoutClientModule} from '@imperium/layout';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import {sample} from '../sample';

export function clientModules(): ImperiumClientModule[] {
	return [
		authClientModule({permissionLookup: authorizationEndpointLookup}),
		graphqlClientModule(),
		routerClientModule(),
		stateClientModule(),
		layoutClientModule(),
		sample(),
	];
}
