import debug from 'debug';
import React from 'react';
import {Menu} from 'semantic-ui-react';
import type {MenuProps} from 'semantic-ui-react';
import type {Item} from '../types';
import {isCustomMenuItem} from '../types';
import {sortWeightedItems, splitHorizontalItems} from '../utils';
import {ItemBarItem} from './ItemBarItem';
import {RenderComponent} from './RenderComponent';

const d = debug('imperium.layout.components.ItemBar');

interface ItemBarProps extends MenuProps {
	name: string;
	items: Item[];
	sidebar?: boolean;
}

function mapItems(name: string, items: Item[], props: MenuProps) {
	return items.map((item, index) => {
		if (isCustomMenuItem(item)) {
			// eslint-disable-next-line react/no-array-index-key
			return <RenderComponent key={`${name}${index}`} render={item.render} />;
		}
		// eslint-disable-next-line react/no-array-index-key
		return <ItemBarItem key={`${name}${item.text}${index}`} item={item} vertical={props.vertical} />;
	});
}

export function ItemBar({name, items, ...rest}: ItemBarProps) {
	const ims = splitHorizontalItems(items);

	const left = mapItems(name, sortWeightedItems(ims.leftItems), rest);
	const rightMappedItems = mapItems(name, sortWeightedItems(ims.rightItems), rest);
	const right = rest.vertical ? rightMappedItems : <Menu.Menu position="right">{rightMappedItems}</Menu.Menu>;

	return (
		<Menu {...rest}>
			{left.length > 0 ? left : null}
			{ims.rightItems.length > 0 ? right : null}
		</Menu>
	);
}
