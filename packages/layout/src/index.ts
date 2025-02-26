import type {ImperiumStateClientModule} from '@imperium/state';
import {withLayout} from './layout/withLayout';
import {state} from './state';
import type {ImperiumLayoutClientModule} from './types';

export function layoutClientModule(): ImperiumStateClientModule & ImperiumLayoutClientModule {
	return {
		name: '@imperium/layout',
		order: 30,
		hocs: [withLayout],
		state,
		layout: {},
	};
}

export type {LayoutData} from './layout/types';
export {useLayoutState, actions as layoutActions} from './state';
export {createPages} from './content/createPages';
export type {ImperiumLayoutClientModule} from './types';
export type {DataHookParams} from './datahooks/types';
export {dividerSidebarItem} from './content/dividerSidebarItem';
