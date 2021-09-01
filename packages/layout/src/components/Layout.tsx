import debug from 'debug';
import React, {ReactNode, useState} from 'react';
import {Icon, Menu, Segment} from 'semantic-ui-react';
import {useLayoutState} from '../state';
import type {LayoutData} from '../types';
import {ItemBar} from './ItemBar';
import styles from './styles.css';

const d = debug('imperium.layout.components.Layout');

interface LayoutProps extends Required<LayoutData> {
	children?: ReactNode;
}

export function Layout({footer, menubar, statusbar, sidebar, children}: LayoutProps) {
	const {isMobile} = useLayoutState();
	const [menuOpen, setMenuOpen] = useState(true);

	const mobileSidebarToggle = {
		stickOnMobile: true,
		weight: -19999,
		render: () => {
			if (!isMobile) return null;
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
		},
	};

	const menubarItems = isMobile ? [mobileSidebarToggle, ...menubar].filter(v => v.stickOnMobile === true) : [mobileSidebarToggle, ...menubar];

	const sidebarItems = isMobile
		? [
				...sidebar,
				{
					text: '',
					menu: [mobileSidebarToggle, ...menubar].filter(v => v.stickOnMobile !== true),
				},
		  ]
		: sidebar;
	const sidebarComp =
		sidebarItems.length > 0 ? (
			<div>
				<ItemBar
					name="sidebar"
					items={sidebarItems}
					inverted
					vertical
					className={isMobile && !menuOpen ? `${styles.sidebar} ${styles.sidebarHidden} imperiumSidebar` : `${styles.sidebar} imperiumSidebar`}
				/>
			</div>
		) : null;

	const footerItems = footer;
	const footerComp =
		footerItems.length > 0 ? <ItemBar name="footer" items={footerItems} className={`${styles.footer} imperiumFooter`} inverted borderless /> : null;

	const statusbarItems = statusbar;
	const statusbarComp =
		statusbarItems.length > 0 ? (
			<ItemBar name="statusbar" items={statusbarItems} inverted className={`${styles.statusbar} imperiumStatusbar`} />
		) : null;

	return (
		<div className={`${styles.parent} imperiumLayout`}>
			<div>
				<ItemBar name="menubar" items={menubarItems} inverted borderless className={`${styles.menubar} imperiumMenubar`} />
				{statusbarComp}
			</div>
			<Segment attached className={`${styles.contentWrapper} imperiumContentWrapper`}>
				{sidebarComp}
				<div className={`${styles.content} imperiumContent`}>{children}</div>
			</Segment>
			{footerComp}
		</div>
	);
}
