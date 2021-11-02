import React from 'react';
import {Icon, Menu} from 'semantic-ui-react';
import styles from './styles.css';

interface SidebarToggleMenuItemProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

export function SidebarToggleMenuItem({menuOpen, setMenuOpen}: SidebarToggleMenuItemProps) {
	return (
		<Menu.Item>
			<Icon
				className={menuOpen ? styles.iconRotated : styles.icon}
				name={menuOpen ? 'close' : 'sidebar'}
				onClick={() => {
					setMenuOpen(!menuOpen);
				}}
			/>
		</Menu.Item>
	);
}
