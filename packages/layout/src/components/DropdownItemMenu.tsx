import React, {useState} from 'react';
import {Accordion, Dropdown, Icon, Menu} from 'semantic-ui-react';
import type {DropdownMenuItem} from '../types';
import styles from './styles.css';

interface DropdownAccordionProps {
	vertical: boolean;
	item: DropdownMenuItem;
	children: JSX.Element[];
}

export function DropdownItemMenu({item, children, vertical}: DropdownAccordionProps) {
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
		<Dropdown item text={item.text} className="imperiumDropdown">
			<Dropdown.Menu className="imperiumDropdownContent">{children}</Dropdown.Menu>
		</Dropdown>
	);
}
