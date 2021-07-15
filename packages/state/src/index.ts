import type {ImperiumClientModule} from '@imperium/client';
import {withImperiumState} from './withImperiumState';
import type {StateClientOptions} from './types';

export function stateClientModule(opts?: StateClientOptions): ImperiumClientModule {
	return {
		name: '@imperium/state',
		hocs: [withImperiumState(opts)],
	};
}

export type {ImperiumStateClientModule, SliceWithSerializer, Serializer, ActionSerializers, StateClientOptions} from './types';
export {createSelectorHook} from './createSelectorHook';
export {createSlice} from './createSlice';
