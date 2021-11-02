import debug from 'debug';
import React from 'react';
import type {MenuProps} from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';
import type {Item} from '../types';
import {sortWeightedItems, splitPositionedItems} from '../utils';
import {ItemWrapper} from './ItemWrapper';

const d = debug('imperium.layout.components.ItemBar');

interface ItemBarProps extends MenuProps {
	items: Item[];
}

/**
 * Renders a horizontal or vertical bar of menu items.
 * @param name
 * @param items
 * @param rest
 * @constructor
 */
export function ItemBar({items, ...rest}: ItemBarProps) {
	const ims = splitPositionedItems(items);

	// eslint-disable-next-line react/no-array-index-key
	const leftItems = sortWeightedItems(ims.leftItems).map((item, index) => <ItemWrapper item={item} key={index} vertical={rest.vertical} />);
	// eslint-disable-next-line react/no-array-index-key
	const rightItems = sortWeightedItems(ims.rightItems).map((item, index) => <ItemWrapper item={item} key={index} vertical={rest.vertical} />);

	return (
		<Menu {...rest}>
			{leftItems}
			{rest.vertical ? rightItems : <Menu.Menu position="right">{rightItems}</Menu.Menu>}
		</Menu>
	);
}
