import React from 'react';
import {Menu} from 'semantic-ui-react';
import type {MenuMenuItem} from '../types';

interface MenuItemMenuProps {
	item: MenuMenuItem;
	children: JSX.Element[];
}

export function MenuItemMenu({item, children}: MenuItemMenuProps) {
	return (
		<Menu.Item>
			<Menu.Header>{item.text}</Menu.Header>
			<Menu.Menu compact="">{children}</Menu.Menu>
		</Menu.Item>
	);
}
