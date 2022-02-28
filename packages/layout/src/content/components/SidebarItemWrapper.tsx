import type {DefineRouteOptions} from '@imperium/router';
import debug from 'debug';
import {Query} from 'mingo';
import {Divider} from 'semantic-ui-react';
import {useBuildContentData} from '../hooks/useBuildContentData';
import type {ContentData, RouteParameters, SidebarItem} from '../types';
import {isActionFormSidebarItem, isActionSidebarItem, isCustomSidebarItem, isDividerSidebarItem} from '../types';
import {ActionFormSidebarItemComponent} from './ActionFormSidebarItemComponent';
import {ActionSidebarItemComponent} from './ActionSidebarItemComponent';
import {CustomSidebarItemComponent} from './CustomSidebarItemComponent';
import {PlainSidebarItem} from './PlainSidebarItem';

const d = debug('imperium.layout.content.components.SidebarItemWrapper');

interface SidebarItemWrapperProps<T extends DefineRouteOptions, K extends keyof T> {
	item: SidebarItem<T, K>;
	data?: ContentData<T, K>;
	params: RouteParameters<T[K]['params']>;
}

export function SidebarItemWrapper<T extends DefineRouteOptions, K extends keyof T>({item, data: parentData, params}: SidebarItemWrapperProps<T, K>) {
	const data = useBuildContentData({
		data: parentData,
		stateSelectorHook: item.stateSelectorHook,
		permissionSelectorHook: item.permissionSelectorHook,
		params,
	});

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
		// @ts-ignore I'm not sure why this error is occurring -mk
		return <ActionSidebarItemComponent item={item} data={data} />;
	}

	if (isActionFormSidebarItem(item)) {
		// @ts-ignore I'm not sure why this error is occurring -mk
		return <ActionFormSidebarItemComponent item={item} data={data} />;
	}

	if (isDividerSidebarItem(item)) {
		return <Divider />;
	}

	// @ts-ignore These types should work, not sure why it's not. Runtime code is fine.
	return <PlainSidebarItem item={item} data={data} />;
}
