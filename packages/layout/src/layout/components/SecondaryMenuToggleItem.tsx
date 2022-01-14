import {Icon, Menu} from 'semantic-ui-react';
import styles from './styles.css';

interface SecondaryMenuToggleItemProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

export function SecondaryMenuToggleItem({menuOpen, setMenuOpen}: SecondaryMenuToggleItemProps) {
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
