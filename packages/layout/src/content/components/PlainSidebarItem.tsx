import {Link} from 'react-router-dom';
import React from 'react';
import {Button} from 'semantic-ui-react';
import type {DefineRouteOptions} from '@imperium/router';
import type {
	ActionFormSidebarItem,
	ActionSidebarItem,
	ContentData,
	CustomSidebarItem,
	DividerSidebarItem,
	SidebarItem,
} from '../types';
import {getColor, getIcon, getRouteTo, getText} from '../utils';

interface PlainSidebarItemProps<T extends DefineRouteOptions, K extends keyof T> {
	item: Exclude<SidebarItem<T, K>, CustomSidebarItem<T, K> | ActionSidebarItem<T, K> | ActionFormSidebarItem<T, K> | DividerSidebarItem<T, K>>;
	data: ContentData<T, K>;
}

export function PlainSidebarItem<T extends DefineRouteOptions, K extends keyof T>({item, data}: PlainSidebarItemProps<T, K>) {
	const icon = getIcon(item, data);

	return (
		<Button fluid compact color={getColor(item, data)} icon={!!icon} labelPosition={icon ? 'left' : undefined} as={Link} to={getRouteTo(item, data)}>
			{icon}
			{getText(item, data)}
		</Button>
	);
}
