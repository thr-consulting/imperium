import type {DefineRouteOptions, ParametersFromAssertion} from '@imperium/router';
import type React from 'react';
import type {SemanticCOLORS, SemanticICONS} from 'semantic-ui-react';
import type {RouteItem, VisibilityItem, WeightedItem} from '../commonItems';
import type {DataHookItem} from '../datahooks/types';
import type {Data, PermissionSelectorHook, StateSelectorHook} from '../types';

export type RouteParameters<T extends readonly string[] | undefined> = T extends readonly string[] ? ParametersFromAssertion<T> : never;

export interface ContentData<T extends DefineRouteOptions, K extends keyof T> extends Data {
	params: RouteParameters<T[K]['params']>;
}

export type Content<T extends DefineRouteOptions, K extends keyof T> = (data: ContentData<T, K>) => JSX.Element;

export interface BaseSidebarItem<T extends DefineRouteOptions, K extends keyof T> extends WeightedItem, VisibilityItem {
	text: string | ((data: ContentData<T, K>) => string);
	icon?: SemanticICONS | ((data: ContentData<T, K>) => SemanticICONS);
	color?: SemanticCOLORS | ((data: ContentData<T, K>) => SemanticCOLORS);
}

export interface DividerSidebarItem<T extends DefineRouteOptions, K extends keyof T> extends BaseSidebarItem<T, K> {
	divider: boolean;
}

export interface ActionSidebarItem<T extends DefineRouteOptions, K extends keyof T> extends BaseSidebarItem<T, K> {
	onClick: (data: ContentData<T, K>) => void;
}

interface ActionFormSidebarItemFormParams<T extends DefineRouteOptions, K extends keyof T> {
	values: Record<string, any>;
	handleChange: (e: React.ChangeEvent<any>) => void;
	fieldError: (fieldName: string | number) => boolean;
	data: ContentData<T, K>;
}
export interface ActionFormSidebarItem<T extends DefineRouteOptions, K extends keyof T> extends BaseSidebarItem<T, K> {
	form: (params: ActionFormSidebarItemFormParams<T, K>) => JSX.Element | null;
	initialValues?: Record<string, any> | ((data: ContentData<T, K>) => Record<string, any>);
	onSubmit?: (values: Record<string, any>, data: ContentData<T, K>) => void;
	validationSchema?: any;
}

export interface CustomSidebarItem<T extends DefineRouteOptions, K extends keyof T> extends WeightedItem, VisibilityItem {
	render: (data: ContentData<T, K>) => JSX.Element | null;
}

export type SidebarItem<T extends DefineRouteOptions, K extends keyof T> =
	| (BaseSidebarItem<T, K> & RouteItem<ContentData<T, K>>)
	| ActionSidebarItem<T, K>
	| CustomSidebarItem<T, K>
	| ActionFormSidebarItem<T, K>
	| DividerSidebarItem<T, K>;

export interface ContentHeaderObject {
	title: string;
	icon?: string;
	size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
}

export function isContentHeaderObject(value: any): value is ContentHeaderObject {
	return value && value.title;
}

export type ContentHeader<T extends DefineRouteOptions, K extends keyof T> =
	| string
	| ContentHeaderObject
	| ((data: ContentData<T, K>) => ContentHeaderObject)
	| JSX.Element
	| ((data: ContentData<T, K>) => JSX.Element)
	| undefined;

export interface Page<T extends DefineRouteOptions, K extends keyof T> {
	dataHooks?: DataHookItem[];
	stateSelectorHook?: StateSelectorHook | StateSelectorHook[];
	permissionSelectorHook?: PermissionSelectorHook | PermissionSelectorHook[];
	content: Content<T, K>;
	header?: ContentHeader<T, K>;
	sidebar?: SidebarItem<T, K>[];
	full?: boolean;
}

export type Pages<T extends DefineRouteOptions> = {
	[key in keyof T]: Page<T, key> | Content<T, key>;
};

export function isPage<T extends DefineRouteOptions, K extends keyof T>(value: any): value is Page<T, K> {
	return !!(value as Page<T, K>).content;
}

export function isActionSidebarItem<T extends DefineRouteOptions, K extends keyof T>(value: any): value is ActionSidebarItem<T, K> {
	return !!(value as ActionSidebarItem<T, K>).onClick;
}

export function isActionFormSidebarItem<T extends DefineRouteOptions, K extends keyof T>(value: any): value is ActionFormSidebarItem<T, K> {
	return !!(value as ActionFormSidebarItem<T, K>).form;
}

export function isCustomSidebarItem<T extends DefineRouteOptions, K extends keyof T>(value: any): value is CustomSidebarItem<T, K> {
	return !!(value as CustomSidebarItem<T, K>).render;
}

export function isDividerSidebarItem<T extends DefineRouteOptions, K extends keyof T>(value: any): value is DividerSidebarItem<T, K> {
	return (value as DividerSidebarItem<T, K>).divider;
}
