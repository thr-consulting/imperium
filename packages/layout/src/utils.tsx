import memoize from 'lodash/memoize';
import sortBy from 'lodash/sortBy';
import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, SemanticICONS} from 'semantic-ui-react';
import {BaseItem, Data, isHorizontalPositionedItem, RouteItem} from './types';
import type {Item, WeightedItem} from './types';

/**
 * Sorts weighted items
 */
export const sortWeightedItems = memoize(function sortWeightedItemsImpl<T extends WeightedItem>(items: T[]) {
	return sortBy(items, v => v.weight || 0);
});

/**
 * Splits positioned items into left and right arrays (if horizontal)
 * @param items
 */
export function splitPositionedItems<T extends Item>(items: T[]) {
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

export function linkParameters(item: BaseItem & RouteItem, data: Data) {
	return item.to
		? {
				as: Link,
				active: data.active,
				to: typeof item.to === 'function' ? item.to(data) : item.to,
		  }
		: {};
}

export function getText(item: BaseItem, data: Data) {
	return typeof item.text === 'function' ? item.text(data) : item.text;
}

export function getIcon(item: BaseItem, data: Data) {
	// Generate the icon component, if it exists
	let iconName: SemanticICONS | undefined;
	if (item.icon) {
		iconName = typeof item.icon === 'function' ? item.icon(data) : item.icon;
	}
	return item.icon ? <Icon name={iconName} /> : null;
}

// /**
//  * Take an array of items and render either a custom item or regular item.
//  * @param name
//  * @param items
//  * @param props
//  */
// export function mapItems(name: string, items: Item[], props: MenuProps) {
// 	return items.map((item, index) => {
// 		if (isCustomMenuItem(item)) {
// 			// eslint-disable-next-line react/no-array-index-key
// 			return <RenderComponent key={`${name}${index}`} render={item.render} />;
// 		}
// 		// eslint-disable-next-line react/no-array-index-key
// 		return <ItemBarItem key={`${name}${item.text}${index}`} item={item} vertical={props.vertical} />;
// 	});
// }
