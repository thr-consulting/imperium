import debug from 'debug';
import React from 'react';
import type {MenuProps} from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';
import {sortWeightedItems} from '../../utils';
import type {LayoutItem} from '../types';
import {splitPositionedItems} from '../utils';
import {LayoutItemWrapper} from './LayoutItemWrapper';

const d = debug('imperium.layout.components.LayoutItemBar');

interface ItemBarProps extends MenuProps {
	items: LayoutItem[];
}

/**
 * Renders a horizontal or vertical bar of menu items.
 * @param name
 * @param items
 * @param rest
 * @constructor
 */
export function LayoutItemBar({items, ...rest}: ItemBarProps) {
	const ims = splitPositionedItems(items);

	// eslint-disable-next-line react/no-array-index-key
	const leftItems = sortWeightedItems(ims.leftItems).map((item, index) => <LayoutItemWrapper item={item} key={index} vertical={rest.vertical} />);
	// eslint-disable-next-line react/no-array-index-key
	const rightItems = sortWeightedItems(ims.rightItems).map((item, index) => <LayoutItemWrapper item={item} key={index} vertical={rest.vertical} />);

	return (
		<Menu {...rest}>
			{leftItems}
			{rest.vertical ? rightItems : <Menu.Menu position="right">{rightItems}</Menu.Menu>}
		</Menu>
	);
}
