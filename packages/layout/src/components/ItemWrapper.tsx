import debug from 'debug';
import {Query} from 'mingo';
import {Dropdown} from 'semantic-ui-react';
import React from 'react';
import type {Data, Item} from '../types';
import {isCustomMenuItem, isDropdownMenuItem, isMenuMenuItem} from '../types';
import {CustomItem} from './CustomItem';
import {DropdownItem} from './DropdownItem';
import {MenuItem} from './MenuItem';
import {PlainItem} from './PlainItem';
import {sortWeightedItems} from '../utils';
import {useBuildData} from '../hooks/useBuildData';

const d = debug('imperium.layout.ItemWrapper');

interface ItemWrapperProps {
	item: Item;
	as?: React.ComponentClass;
	vertical?: boolean;
	data?: Data;
}

/**
 * Renders any type of Item. Gathers state, route and other data and checks for visibility.
 * @param item
 * @param as
 * @param vertical
 * @param parentData
 * @constructor
 */
export function ItemWrapper({item, as, vertical, data: parentData}: ItemWrapperProps) {
	const data = useBuildData(item, parentData);

	// Check if visible
	if (item.visible) {
		if (typeof item.visible === 'function') {
			if (!item.visible(data)) return null;
		} else {
			const q = new Query(item.visible || {});
			if (!q.test(data)) return null;
		}
	}

	if (isCustomMenuItem(item)) {
		return <CustomItem item={item} />;
	}
	if (isDropdownMenuItem(item)) {
		// eslint-disable-next-line react/no-array-index-key
		const children = sortWeightedItems(item.dropdown).map((v, index) => <ItemWrapper key={index} item={v} as={Dropdown.Item} data={data} />);
		return <DropdownItem item={item} children={children} vertical={vertical} data={data} />;
	}
	if (isMenuMenuItem(item)) {
		// eslint-disable-next-line react/no-array-index-key
		const children = sortWeightedItems(item.menu).map((v, index) => (
			<ItemWrapper key={index} item={v} as={Dropdown.Item} vertical={vertical} data={data} />
		));
		return <MenuItem item={item} children={children} />;
	}
	return <PlainItem item={item} data={data} as={as} />;
}
