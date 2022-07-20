import debug from 'debug';
import {Box} from '@mantine/core';
import {sortWeightedItems} from '../../utils';
import type {LayoutItem} from '../types';
import {splitPositionedItems} from '../utils';
import {LayoutItemWrapper} from './LayoutItemWrapper';

const d = debug('imperium.layout.components.LayoutItemBar');

interface ItemBarProps {
	items: LayoutItem[];
	vertical?: boolean;
	className?: string;
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
	const leftItems = sortWeightedItems(ims.leftItems).map((item, index) => (
		// eslint-disable-next-line react/no-array-index-key
		<LayoutItemWrapper item={item as LayoutItem} key={index} vertical={rest.vertical} />
	));
	// eslint-disable-next-line react/no-array-index-key
	const rightItems = sortWeightedItems(ims.rightItems).map((item, index) => (
		// eslint-disable-next-line react/no-array-index-key
		<LayoutItemWrapper item={item as LayoutItem} key={index} vertical={rest.vertical} />
	));

	return (
		<Box sx={{display: 'flex', flexWrap: 'nowrap', alignItems: 'center', height: '100%'}} pl="sm" pr="sm">
			{leftItems}
			{rest.vertical || rightItems.length === 0 ? rightItems : <Box sx={{marginLeft: 'auto'}}>{rightItems}</Box>}
		</Box>
	);
}
