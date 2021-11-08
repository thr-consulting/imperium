import type {Data, StateSelectorHook, VisibilityQueryFn} from './types';

/**
 * Describes an item that can hide itself based on redux state
 */
export interface VisibilityItem {
	stateSelectorHook?: StateSelectorHook | StateSelectorHook[]; // Hook or array of hooks that select state
	visible?: Record<string, unknown> | VisibilityQueryFn;
}

/**
 * Describes an item with optional weight
 */
export interface WeightedItem {
	weight?: number; // Larger numbers move right/down
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
 * Describes an item that can be positioned horizontally left or right
 */
export interface HorizontalPositionedItem {
	position?: 'left' | 'right'; // Default is left
	stickOnMobile?: boolean; // If true, will not be hidden when in mobile mode
}

export function isHorizontalPositionedItem(value: any): value is HorizontalPositionedItem {
	return !!((value as HorizontalPositionedItem).position || (value as HorizontalPositionedItem).stickOnMobile);
}

export function isRouteItem(value: any): value is RouteItem {
	return !!((value as RouteItem).to || (value as RouteItem).exact || (value as RouteItem).strict || (value as RouteItem).sensitive);
}
