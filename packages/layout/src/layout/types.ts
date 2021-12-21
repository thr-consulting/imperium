import type {SemanticICONS} from 'semantic-ui-react';
import type {HorizontalPositionedItem, RouteItem, VisibilityItem, WeightedItem} from '../commonItems';
import type {DataHookItem} from '../datahooks/types';
import type {Data, PermissionSelectorHook} from '../types';

/**
 * Describes a basic weighted, possibly visible item
 */
export interface BaseLayoutItem extends WeightedItem, VisibilityItem {
	text: string | ((data: Data) => string);
	icon?: SemanticICONS | ((data: Data) => SemanticICONS);
	moveToKey?: string;
}

export interface CustomLayoutItem extends WeightedItem, VisibilityItem {
	render: (data: Data) => JSX.Element | null;
	moveToKey?: string;
}

/**
 * Describes a menu that displays a dropdown list of items
 */
export interface DropdownLayoutItem extends BaseLayoutItem {
	dropdown: ((BaseLayoutItem & RouteItem<Data>) | CustomLayoutItem)[];
	key?: string;
}

/**
 * Describes a menu that displays a sub menu (not a dropdown list)
 */
export interface MenuLayoutItem extends BaseLayoutItem {
	menu: ((BaseLayoutItem & RouteItem<Data>) | CustomLayoutItem)[];
	key?: string;
}

/**
 * Describes a horizontal menu item which is either a route item or dropdown menu
 */
export type LayoutItem = (BaseLayoutItem & RouteItem<Data>) | DropdownLayoutItem | MenuLayoutItem | CustomLayoutItem;

export interface LayoutData {
	permissionSelectorHooks?: PermissionSelectorHook[];
	dataHooks?: DataHookItem[];
	primaryMenu?: (LayoutItem & HorizontalPositionedItem)[]; // primary menu
	statusbar?: (LayoutItem & HorizontalPositionedItem)[];
	secondaryMenu?: LayoutItem[]; // secondary menu
	footer?: (LayoutItem & HorizontalPositionedItem)[]; // footer
}

export function isCustomLayoutItem(value: any): value is CustomLayoutItem {
	return !!(value as CustomLayoutItem).render;
}

export function isDropdownLayoutItem(value: any): value is DropdownLayoutItem {
	return !!(value as DropdownLayoutItem).dropdown;
}

export function isMenuLayoutItem(value: any): value is MenuLayoutItem {
	return !!(value as MenuLayoutItem).menu;
}
