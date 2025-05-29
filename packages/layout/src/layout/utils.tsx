import {Link} from 'react-router-dom';
import {Icon, type SemanticICONS} from 'semantic-ui-react';
import type {RouteItem} from '../commonItems';
import {isHorizontalPositionedItem} from '../commonItems';
import type {Data} from '../types';
import type {BaseLayoutItem, LayoutItem} from './types';

/**
 * Splits positioned items into left and right arrays (if horizontal)
 * @param items
 */
export function splitPositionedItems<T extends LayoutItem>(items: T[]) {
	return items.reduce(
		(memo, v) => {
			if (isHorizontalPositionedItem(v) && v.position === 'right') {
				return {
					leftItems: memo.leftItems,
					rightItems: [...memo.rightItems, v],
				};
			}
			return {
				leftItems: [...memo.leftItems, v],
				rightItems: memo.rightItems,
			};
		},
		{leftItems: [], rightItems: []} as {leftItems: T[]; rightItems: T[]},
	);
}

export function linkParameters(item: BaseLayoutItem & RouteItem<Data>, data: Data) {
	return item.to
		? {
				as: Link,
				active: data.active,
				to: typeof item.to === 'function' ? item.to(data) : item.to,
			}
		: {};
}

export function getText(item: BaseLayoutItem, data: Data) {
	return typeof item.text === 'function' ? item.text(data) : item.text;
}

export function getIcon(item: BaseLayoutItem, data: Data) {
	// Generate the icon component, if it exists
	let iconName: SemanticICONS | undefined;
	if (item.icon) {
		iconName = typeof item.icon === 'function' ? item.icon(data) : item.icon;
	}
	return item.icon ? <Icon name={iconName} /> : null;
}
