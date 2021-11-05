import type {ImperiumStateClientModule} from '@imperium/state';
import {useMobileLayout} from './layout/hooks/useMobileLayout';
import {state} from './state';
import {withLayout} from './layout/withLayout';
import type {ImperiumLayoutClientModule} from './types';

export function layoutClientModule(): ImperiumStateClientModule & ImperiumLayoutClientModule {
	return {
		name: '@imperium/layout',
		order: 30,
		hocs: [withLayout],
		state,
		layout: {
			dataHooks: [useMobileLayout],
		},
	};
}

export type {LayoutData} from './layout/types';
export {useLayoutState, actions as layoutActions} from './state';
export {createPages} from './content/createPages';
export type {ImperiumLayoutClientModule} from './types';
export {dividerSidebarItem} from './content/dividerSidebarItem';
