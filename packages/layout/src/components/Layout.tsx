import debug from 'debug';
import React, {ReactNode, useState} from 'react';
import {Segment} from 'semantic-ui-react';
import {useLayoutState} from '../state';
import type {LayoutData} from '../types';
import {ItemBar} from './ItemBar';
import styles from './styles.css';
import {SidebarToggleMenuItem} from './SidebarToggleMenuItem';

const d = debug('imperium.layout.components.Layout');

interface LayoutProps extends Required<LayoutData> {
	children?: ReactNode;
}

/**
 * Renders the main layout.
 * Hides/shows/collapses things as need for mobile layout.
 * Tracks state to whether the side menu is open or not.
 * @param footer
 * @param menubar
 * @param statusbar
 * @param sidebar
 * @param children
 * @constructor
 */
export function Layout({footer, menubar, statusbar, sidebar, children}: LayoutProps) {
	const {isMobile} = useLayoutState();
	const [menuOpen, setMenuOpen] = useState(true);

	const mobileSidebarToggleItem = {
		stickOnMobile: true,
		weight: -19999,
		render: () => {
			if (!isMobile) return null;
			return <SidebarToggleMenuItem menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
		},
	};

	// Determine menubar items
	const menubarItems = isMobile ? [mobileSidebarToggleItem, ...menubar].filter(v => v.stickOnMobile === true) : [mobileSidebarToggleItem, ...menubar];

	// Determine sidebar items
	const sidebarItems = isMobile
		? [
				...sidebar,
				{
					text: '',
					menu: [mobileSidebarToggleItem, ...menubar].filter(v => v.stickOnMobile !== true),
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

	// Determine footer items
	const footerItems = footer;
	const footerComp =
		footerItems.length > 0 ? <ItemBar name="footer" items={footerItems} className={`${styles.footer} imperiumFooter`} inverted borderless /> : null;

	// Determine status bar items
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
