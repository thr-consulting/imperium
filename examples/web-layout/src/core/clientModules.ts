// import {authClientModule, authorizationEndpointLookup} from '@imperium/auth-client';
import type {ImperiumClientModule} from '@imperium/client';
import {layoutClientModule} from '@imperium/layout';
import {routerClientModule} from '@imperium/router';
import {stateClientModule} from '@imperium/state';
import {sample} from '../sample';

export function clientModules(): ImperiumClientModule[] {
	return [
		// authClientModule({permissionLookup: authorizationEndpointLookup}),
		routerClientModule(),
		stateClientModule(),
		layoutClientModule(),
		sample(),
	];
}
