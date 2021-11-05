import React from 'react';
import {Query} from 'mingo';
import type {DefineRouteOptions} from '@imperium/router';
import {Divider} from 'semantic-ui-react';
import debug from 'debug';
import type {ContentData, RouteParameters, SidebarItem} from '../types';
import {isActionFormSidebarItem, isActionSidebarItem, isCustomSidebarItem, isDividerSidebarItem} from '../types';
import {useBuildContentData} from '../hooks/useBuildContentData';
import {PlainSidebarItem} from './PlainSidebarItem';
import {CustomSidebarItemComponent} from './CustomSidebarItemComponent';
import {ActionSidebarItemComponent} from './ActionSidebarItemComponent';
import {ActionFormSidebarItemComponent} from './ActionFormSidebarItemComponent';

const d = debug('imperium.layout.content.SidebarItemWrapper');

interface SidebarItemWrapperProps<T extends DefineRouteOptions, K extends keyof T> {
	item: SidebarItem<T, K>;
	data?: ContentData<T, K>;
	params: RouteParameters<T[K]['params']>;
}

export function SidebarItemWrapper<T extends DefineRouteOptions, K extends keyof T>({item, data: parentData, params}: SidebarItemWrapperProps<T, K>) {
	const data = useBuildContentData({data: parentData, stateSelectorHook: item.stateSelectorHook, params});

	// Check if visible
	if (item.visible) {
		if (typeof item.visible === 'function') {
			if (!item.visible(data)) return null;
		} else {
			const q = new Query(item.visible || {});
			if (!q.test(data)) return null;
		}
	}

	if (isCustomSidebarItem(item)) {
		return <CustomSidebarItemComponent item={item} data={data} />;
	}

	if (isActionSidebarItem(item)) {
		return <ActionSidebarItemComponent item={item} data={data} />;
	}

	if (isActionFormSidebarItem(item)) {
		return <ActionFormSidebarItemComponent item={item} data={data} />;
	}

	if (isDividerSidebarItem(item)) {
		return <Divider />;
	}

	// @ts-ignore These types should work, not sure why it's not. Runtime code is fine.
	return <PlainSidebarItem item={item} data={data} />;
}
