import type {ImperiumClientModule} from '@imperium/client';
import type {StateClientOptions} from './types';
import {withImperiumState} from './withImperiumState';

export function stateClientModule(opts?: StateClientOptions): ImperiumClientModule {
	return {
		name: '@imperium/state',
		hocs: [withImperiumState(opts)],
	};
}

export type {ImperiumStateClientModule, StateClientOptions} from './types';

export {createSelectorHook} from './createSelectorHook';
export {createSerializedSelectorHook} from './createSerializedSelectorHook';
export {getActions} from './getActions';
export {createSerializedSlice} from './createSerializedSlice';
