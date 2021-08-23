import type {ImperiumStateClientModule} from '@imperium/state';
import {useMobileLayout} from './hooks/useMobileLayout';
import {state} from './state';
import type {ImperiumLayoutClientModule} from './types';
import {withLayout} from './withLayout';

export function layoutClientModule(): ImperiumStateClientModule & ImperiumLayoutClientModule {
	return {
		name: '@imperium/layout',
		hocs: [withLayout],
		state,
		layout: {
			dataHooks: [useMobileLayout],
		},
	};
}

export type {ImperiumLayoutClientModule, LayoutData} from './types';
