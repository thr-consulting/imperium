import debug from 'debug';
import {Query} from 'mingo';
import type {ComponentClass} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {useBuildData} from '../../hooks/useBuildData';
import type {Data} from '../../types';
import {sortWeightedItems} from '../../utils';
import type {LayoutItem} from '../types';
import {isCustomLayoutItem, isDropdownLayoutItem, isMenuLayoutItem} from '../types';
import {CustomLayoutItemComponent} from './CustomLayoutItemComponent';
import {DropdownItem} from './DropdownItem';
import {MenuItem} from './MenuItem';
import {PlainItem} from './PlainItem';

const d = debug('imperium.layout.components.LayoutItemWrapper');

interface ItemWrapperProps {
	item: LayoutItem;
	as?: ComponentClass;
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
export function LayoutItemWrapper({item, as, vertical, data: parentData}: ItemWrapperProps) {
	const data = useBuildData({
		stateSelectorHook: item.stateSelectorHook,
		permissionSelectorHook: item.permissionSelectorHook,
		routeItem: item,
		data: parentData,
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

	if (isCustomLayoutItem(item)) {
		return <CustomLayoutItemComponent item={item} data={data} />;
	}
	if (isDropdownLayoutItem(item)) {
		// eslint-disable-next-line react/no-array-index-key
		const children = sortWeightedItems(item.dropdown).map((v, index) => <LayoutItemWrapper key={index} item={v} as={Dropdown.Item} data={data} />);
		return <DropdownItem item={item} children={children} vertical={vertical} data={data} />;
	}
	if (isMenuLayoutItem(item)) {
		// eslint-disable-next-line react/no-array-index-key
		const children = sortWeightedItems(item.menu).map((v, index) => (
			// eslint-disable-next-line react/no-array-index-key
			<LayoutItemWrapper key={index} item={v} as={Dropdown.Item} vertical={vertical} data={data} />
		));
		return <MenuItem item={item} children={children} />;
	}
	return <PlainItem item={item} data={data} as={as} />;
}
