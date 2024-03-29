import type {ComponentClass} from 'react';
import {Menu} from 'semantic-ui-react';
import type {Data} from '../../types';
import type {CustomLayoutItem, DropdownLayoutItem, LayoutItem, MenuLayoutItem} from '../types';
import {getIcon, getText, linkParameters} from '../utils';

interface PlainItemProps {
	item: Exclude<LayoutItem, MenuLayoutItem | DropdownLayoutItem | CustomLayoutItem>;
	data: Data;
	as?: ComponentClass;
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
