import debug from 'debug';
import {useState} from 'react';
import {Accordion, Dropdown, Icon, Menu} from 'semantic-ui-react';
import type {Data} from '../../types';
import type {DropdownLayoutItem} from '../types';
import {getText} from '../utils';
import styles from './styles.css';

const d = debug('imperium.layout.components.DropdownItem');

interface DropdownItemProps {
	item: DropdownLayoutItem;
	children: JSX.Element[];
	data: Data;
	vertical?: boolean;
}

export function DropdownItem({item, vertical, children, data}: DropdownItemProps) {
	const [open, setOpen] = useState(false);

	if (vertical) {
		return (
			<Menu.Item className="imperiumVerticalDropdown">
				<Accordion fluid>
					<Accordion.Title
						className={styles.verticalDropdownTitle}
						onClick={ev => {
							ev.stopPropagation();
							setOpen(!open);
						}}
					>
						<Icon className={open ? styles.verticalDropdownIconRotated : styles.verticalDropdownIcon} name="arrow right" />
						{item.text}
					</Accordion.Title>
					<Accordion.Content active={open} className={`${styles.verticalDropdownContent} imperiumVerticalDropdownContent`} children={children} />
				</Accordion>
			</Menu.Item>
		);
	}

	return (
		<Dropdown item text={getText(item, data)} className="imperiumDropdown">
			<Dropdown.Menu className="imperiumDropdownContent">{children}</Dropdown.Menu>
		</Dropdown>
	);
}
