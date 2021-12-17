import type {ImperiumClientModule} from '@imperium/client';
import type {Location} from 'history';
import type {LayoutData} from './layout/types';

export type State = Record<string, any>;
/**
 * A hook that selects from redux state.
 */
export type StateSelectorHook = () => State;

export type PermissionResults = Record<string, boolean>;

export type PermissionSelectorHook = (data: Data) => PermissionResults;

/**
 * The visibility query can either be a mingo query or a function that returns a boolean. The data is an object with the router path merged with any state selector hook data.
 */
export type VisibilityQueryFn = (data: Data) => boolean;

export interface Data extends Record<string, unknown> {
	loc: Location;
	route: {
		path: string[];
		hash: string;
		search: Record<string, any>;
	};
	state: State;
	active: boolean;
	permissions: PermissionResults;
	id?: string;
}

export interface ImperiumLayoutClientModule extends ImperiumClientModule {
	layout: LayoutData;
}

export function isImperiumLayoutClientModule(module: ImperiumClientModule): module is ImperiumLayoutClientModule {
	const layoutModule = module as ImperiumLayoutClientModule;
	return layoutModule.layout !== undefined;
}
