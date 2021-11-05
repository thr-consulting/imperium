import React from 'react';
import {Menu} from 'semantic-ui-react';
import type {CustomLayoutItem, DropdownLayoutItem, LayoutItem, MenuLayoutItem} from '../types';
import {getIcon, getText, linkParameters} from '../utils';
import type {Data} from '../../types';

interface PlainItemProps {
	item: Exclude<LayoutItem, MenuLayoutItem | DropdownLayoutItem | CustomLayoutItem>;
	data: Data;
	as?: React.ComponentClass;
}

export function PlainItem({item, data, as}: PlainItemProps) {
	const linkParams = linkParameters(item, data);

	const ItemX = as || Menu.Item;

	return (
		<ItemX {...linkParams}>
			{getIcon(item, data)}
			{getText(item, data)}
		</ItemX>
	);
}
