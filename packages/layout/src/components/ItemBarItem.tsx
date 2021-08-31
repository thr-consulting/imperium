import debug from 'debug';
import compact from 'lodash/compact';
import queryString from 'query-string';
import React, {useMemo} from 'react';
import {Link, RouteProps, useLocation, useRouteMatch} from 'react-router-dom';
import {Dropdown, Icon, Menu} from 'semantic-ui-react';
import type {BaseItem, DropdownMenuItem, MenuMenuItem, RouteItem} from '../types';
import {isDropdownMenuItem, isMenuMenuItem} from '../types';
import {sortWeightedItems} from '../utils';
import {DropdownItemMenu} from './DropdownItemMenu';
import {MenuItemMenu} from './MenuItemMenu';

const d = debug('imperium.layout.components.ItemBarItem');

interface ItemBarItemProps {
	item: (BaseItem & RouteItem) | DropdownMenuItem | MenuMenuItem;
	as?: React.ComponentClass;
	vertical?: boolean;
}

export function ItemBarItem({item, as, vertical}: ItemBarItemProps) {
	const loc = useLocation();

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

	const icon = item.icon ? <Icon name={item.icon} /> : null;
	const selectedState = item.visible?.selectorHook();

	const isVisible = useMemo(() => {
		const compareObj = {
			...(selectedState as Record<string, unknown>),
			location: {
				path: compact(loc.pathname.split('/')),
				hash: loc.hash,
				search: queryString.parse(loc.search),
			},
		};
		if (item.visible) {
			return item.visible.query.test(compareObj);
		}
		return true;
	}, [item.visible, selectedState, loc.search, loc.pathname, loc.hash]);

	if (!isVisible) {
		return null;
	}

	if (isDropdownMenuItem(item)) {
		return (
			<DropdownItemMenu
				vertical={vertical || false}
				item={item}
				children={sortWeightedItems(item.dropdown).map(v => (
					<ItemBarItem key={v.text} item={v} as={Dropdown.Item} />
				))}
			/>
		);
	}

	if (isMenuMenuItem(item)) {
		return (
			<MenuItemMenu
				item={item}
				children={sortWeightedItems(item.menu).map(v => (
					<ItemBarItem key={v.text} item={v} as={Dropdown.Item} />
				))}
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

	return (
		<ItemX {...linkParams} {...menuParams}>
			{icon}
			{item.text}
		</ItemX>
	);
}
