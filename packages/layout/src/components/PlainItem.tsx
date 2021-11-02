import React from 'react';
import {Menu} from 'semantic-ui-react';
import type {CustomMenuItem, Data, DropdownMenuItem, Item, MenuMenuItem} from '../types';
import {getIcon, getText, linkParameters} from '../utils';

interface PlainItemProps {
	item: Exclude<Item, MenuMenuItem | DropdownMenuItem | CustomMenuItem>;
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