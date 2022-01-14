import {Menu} from 'semantic-ui-react';
import type {MenuLayoutItem} from '../types';

interface MenuItemProps {
	item: MenuLayoutItem;
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
