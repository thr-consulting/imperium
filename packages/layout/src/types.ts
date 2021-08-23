import type {ImperiumClientModule} from '@imperium/client';
import type {Query} from 'mingo';
import type {SemanticICONS} from 'semantic-ui-react';

export type DataHook = () => void;

/**
 * Describes an item with optional weight
 */
export interface WeightedItem {
	weight?: number;
}

/**
 * Describes an item that can be positioned horizontally left or right
 */
export interface HorizontalPositionedItem {
	position?: 'left' | 'right';
	stickOnMobile?: boolean;
}

export interface VisibilityQuery {
	query: Query;
	selectorHook: () => unknown;
}

/**
 * Describes an item that can be hide itself based on redux state
 */
export interface VisibilityItem {
	visible?: VisibilityQuery;
}

/**
 * Describes an item that links to a route
 */
export interface RouteItem {
	to?: string;
}

/**
 * Describes a basic weighted, possibly visible item
 */
export interface BaseItem extends WeightedItem, VisibilityItem {
	text: string;
	icon?: SemanticICONS;
}

/**
 * Describes a menu that displays a dropdown list of items
 */
export interface DropdownMenuItem extends BaseItem {
	dropdown: (BaseItem & RouteItem)[];
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
export type Item = ((BaseItem & RouteItem) | DropdownMenuItem | MenuMenuItem | CustomMenuItem) & HorizontalPositionedItem;

export interface LayoutData {
	dataHooks: DataHook[];
	menubar: (Item & HorizontalPositionedItem)[];
	statusbar: (Item & HorizontalPositionedItem)[];
	sidebar: Item[];
	footer: (Item & HorizontalPositionedItem)[];
}

export interface ImperiumLayoutClientModule extends ImperiumClientModule {
	layout: Partial<LayoutData>;
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
