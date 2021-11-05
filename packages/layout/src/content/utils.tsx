import type {DefineRouteOptions} from '@imperium/router';
import React from 'react';
import {Icon, SemanticCOLORS} from 'semantic-ui-react';
import type {RouteItem} from '../commonItems';
import type {BaseSidebarItem, ContentData} from './types';

export function getIcon<T extends DefineRouteOptions, K extends keyof T>(item: BaseSidebarItem<T, K>, data: ContentData<T, K>) {
	if (item.icon) {
		const iconName = typeof item.icon === 'function' ? item.icon(data) : item.icon;
		return <Icon name={iconName} />;
	}
	return null;
}

export function getRouteTo<T extends DefineRouteOptions, K extends keyof T>(item: RouteItem, data: ContentData<T, K>) {
	if (item.to) {
		return typeof item.to === 'function' ? item.to(data) : item.to;
	}
	return '';
}

export function getText<T extends DefineRouteOptions, K extends keyof T>(item: BaseSidebarItem<T, K>, data: ContentData<T, K>) {
	return typeof item.text === 'function' ? item.text(data) : item.text;
}

export function getColor<T extends DefineRouteOptions, K extends keyof T>(item: BaseSidebarItem<T, K>, data: ContentData<T, K>): SemanticCOLORS {
	if (!item.color) return 'blue';
	return typeof item.color === 'function' ? item.color(data) : item.color;
}
