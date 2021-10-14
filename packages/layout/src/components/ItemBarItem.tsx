import debug from 'debug';
import React from 'react';
import {Link, RouteProps, useLocation, useRouteMatch} from 'react-router-dom';
import {Dropdown, Icon, Menu} from 'semantic-ui-react';
import type {Location} from 'history';
import type {BaseItem, DropdownMenuItem, MenuMenuItem, RouteItem} from '../types';
import {isDropdownMenuItem, isMenuMenuItem} from '../types';
import {sortWeightedItems} from '../utils';
import {DropdownItemMenu} from './DropdownItemMenu';
import {MenuItemMenu} from './MenuItemMenu';
import {RenderIfVisible} from './RenderIfVisible';

const d = debug('imperium.layout.components.ItemBarItem');

interface ItemBarItemProps {
	item: (BaseItem & RouteItem) | DropdownMenuItem | MenuMenuItem;
	as?: React.ComponentClass;
	vertical?: boolean;
}

export function ItemBarItem({item, as, vertical}: ItemBarItemProps) {
	const loc = useLocation() as Location;

	// Determine if the current route matches the to route to see if the link is active
	const routeMatchObject: RouteProps = {};
	if (!isDropdownMenuItem(item) && !isMenuMenuItem(item) && item.to) {
		if (typeof item.to === 'string') {
			routeMatchObject.path = item.to;
		}
		if (typeof item.to === 'function') {
			routeMatchObject.path = item.to(loc);
		}
		routeMatchObject.exact = item.exact !== false;
		routeMatchObject.sensitive = item.sensitive;
		routeMatchObject.strict = item.strict;
	}
	const routeMatch = useRouteMatch(routeMatchObject);
	const active = routeMatch !== null;

	// Generate the icon component, if it exists
	const icon = item.icon ? <Icon name={item.icon} /> : null;

	if (isDropdownMenuItem(item)) {
		return (
			<RenderIfVisible
				component={
					<DropdownItemMenu
						vertical={vertical || false}
						item={item}
						children={sortWeightedItems(item.dropdown).map(v => (
							<ItemBarItem key={v.text} item={v} as={Dropdown.Item} />
						))}
					/>
				}
				item={item}
			/>
		);
	}

	if (isMenuMenuItem(item)) {
		return (
			<RenderIfVisible
				component={
					<MenuItemMenu
						item={item}
						children={sortWeightedItems(item.menu).map(v => (
							<ItemBarItem key={v.text} item={v} as={Dropdown.Item} />
						))}
					/>
				}
				item={item}
			/>
		);
	}

	const linkParams = item.to
		? {
				as: Link,
				active,
				to: typeof item.to === 'function' ? item.to(loc) : item.to,
		  }
		: {};

	const menuParams = as
		? {}
		: {
				link: !!item.to,
		  };

	const ItemX = as || Menu.Item;

	const renderedItem = (
		<ItemX {...linkParams} {...menuParams}>
			{icon}
			{item.text}
		</ItemX>
	);

	return <RenderIfVisible component={renderedItem} item={item} />;
}
