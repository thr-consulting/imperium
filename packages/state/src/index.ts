import type {ImperiumClientModule} from '@imperium/client';
import {withImperiumState} from './withImperiumState';

export function stateClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/state',
		hocs: [withImperiumState],
	};
}

export type {ImperiumStateClientModule} from './types';
export {createSelectorHook} from './createSelectorHook';
