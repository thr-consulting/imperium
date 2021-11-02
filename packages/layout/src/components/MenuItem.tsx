import React from 'react';
import {Menu} from 'semantic-ui-react';
import type {MenuMenuItem} from '../types';

interface MenuItemProps {
	item: MenuMenuItem;
	children: JSX.Element[];
}

export function MenuItem({item, children}: MenuItemProps) {
	return (
		<Menu.Item>
			<Menu.Header>{item.text}</Menu.Header>
			<Menu.Menu compact="">{children}</Menu.Menu>
		</Menu.Item>
	);
}
