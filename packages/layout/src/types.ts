import type {ImperiumClientModule} from '@imperium/client';
import type {Location} from 'history';
import type {SemanticICONS} from 'semantic-ui-react';

/**
 * A simple hook, that doesn't return anything. If used together with a route match function, the returned route parameters are passed in.
 */
export type DataHook = (routeParams?: any) => void;

/**
 * A route match function that can be used by data hooks. Usually is the @imperium/router `routes.match.x()` functions.
 */
export type DataHookRouteMatchFn = (route: string) => any;

/**
 * An object that can specify one or more data hooks that can receive route parameters from one or more route match functions.
 */
export type DataHookRoute = {
	routeMatch: DataHookRouteMatchFn | DataHookRouteMatchFn[];
	dataHook: DataHook | DataHook[];
};

/**
 * A datahook can either be a simple hook, or one or more hooks dependant on one or more route match functions.
 */
export type DataHookItem = DataHook | DataHookRoute;

/**
 * Describes an item with optional weight
 */
export interface WeightedItem {
	weight?: number; // Larger numbers move right/down
}

/**
 * Describes an item that can be positioned horizontally left or right
 */
export interface HorizontalPositionedItem {
	position?: 'left' | 'right'; // Default is left
	stickOnMobile?: boolean; // If true, will not be hidden when in mobile mode
}

export type State = Record<string, any>;

/**
 * A hook that selects from redux state.
 */
export type StateSelectorHook = () => State;

/**
 * The visibility query can either be a mingo query or a function that returns a boolean. The data is an object with the router path merged with any state selector hook data.
 */
export type VisibilityQueryFn = (data: Data) => boolean;

/**
 * Describes an item that can hide itself based on redux state
 */
export interface VisibilityItem {
	stateSelectorHook?: StateSelectorHook | StateSelectorHook[]; // Hook or array of hooks that select state
	visible?: Record<string, unknown> | VisibilityQueryFn;
}

export interface Data extends Record<string, unknown> {
	loc: Location;
	route: {
		path: string[];
		hash: string;
		search: Record<string, any>;
	};
	state: State;
	active: boolean;
}

/**
 * Describes an item that links to a route
 */
export interface RouteItem {
	to?: string | ((data: Data) => string);
	exact?: boolean;
	strict?: boolean;
	sensitive?: boolean;
}

/**
 * Describes a basic weighted, possibly visible item
 */
export interface BaseItem extends WeightedItem, VisibilityItem {
	text: string | ((data: Data) => string);
	icon?: SemanticICONS | ((data: Data) => SemanticICONS);
}

/**
 * Describes a menu that displays a dropdown list of items
 */
export interface DropdownMenuItem extends BaseItem {
	dropdown: ((BaseItem & RouteItem) | CustomMenuItem)[];
}

/**
 * Describes a menu that displays a sub menu (not a dropdown list)
 */
export interface MenuMenuItem extends BaseItem {
	menu: (BaseItem & RouteItem)[];
}

export interface CustomMenuItem extends WeightedItem, VisibilityItem {
	render: () => JSX.Element | null;
}

/**
 * Describes a horizontal menu item which is either a route item or dropdown menu
 */
export type Item = (BaseItem & RouteItem) | DropdownMenuItem | MenuMenuItem | CustomMenuItem;

export interface LayoutData {
	dataHooks?: DataHookItem[];
	menubar?: (Item & HorizontalPositionedItem)[];
	statusbar?: (Item & HorizontalPositionedItem)[];
	sidebar?: Item[];
	footer?: (Item & HorizontalPositionedItem)[];
}

export interface ImperiumLayoutClientModule extends ImperiumClientModule {
	layout: LayoutData;
}

export function isImperiumLayoutClientModule(module: ImperiumClientModule): module is ImperiumLayoutClientModule {
	const layoutModule = module as ImperiumLayoutClientModule;
	return layoutModule.layout !== undefined;
}

export function isDropdownMenuItem(value: any): value is DropdownMenuItem {
	return !!(value as DropdownMenuItem).dropdown;
}

export function isMenuMenuItem(value: any): value is MenuMenuItem {
	return !!(value as MenuMenuItem).menu;
}

export function isCustomMenuItem(value: any): value is CustomMenuItem {
	return !!(value as CustomMenuItem).render;
}

export function isHorizontalPositionedItem(value: any): value is HorizontalPositionedItem {
	return !!((value as HorizontalPositionedItem).position || (value as HorizontalPositionedItem).stickOnMobile);
}

export function isRouteItem(value: any): value is RouteItem {
	return !!((value as RouteItem).to || (value as RouteItem).exact || (value as RouteItem).strict || (value as RouteItem).sensitive);
}
