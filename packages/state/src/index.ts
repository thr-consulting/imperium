import type {ImperiumClientModule} from '@imperium/client';
import type {StateClientOptions} from './types';
import {withImperiumState} from './withImperiumState';

export function stateClientModule(opts?: StateClientOptions): ImperiumClientModule {
	return {
		name: '@imperium/state',
		order: 10,
		hocs: [withImperiumState(opts)],
	};
}

export type {ImperiumStateClientModule, StateClientOptions} from './types';

export {createSliceHook} from './createSliceHook';
