import debug from 'debug';
import React, {ReactNode, useState} from 'react';
import {Segment} from 'semantic-ui-react';
import {useLayoutState} from '../../state';
import {moveItems} from '../moveItems';
import type {LayoutData} from '../types';
import {LayoutItemBar} from './LayoutItemBar';
import {SecondaryMenuToggleItem} from './SecondaryMenuToggleItem';
import styles from './styles.css';

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
 * @param children
 * @constructor
 */
export function Layout({footer, primaryMenu, statusbar, secondaryMenu, children}: LayoutProps) {
	const {isMobile} = useLayoutState();
	const [menuOpen, setMenuOpen] = useState(true);

	const primaryMenuToggle = {
		stickOnMobile: true,
		weight: -19999,
		render: () => {
			if (!isMobile) return null;
			return <SecondaryMenuToggleItem menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
		},
	};

	// Determine menubar items
	const primaryMenuItems = moveItems(
		isMobile ? [primaryMenuToggle, ...primaryMenu].filter(v => v.stickOnMobile === true) : [primaryMenuToggle, ...primaryMenu],
	);

	// const pmi = mergeItems(primaryMenuItems);

	// Determine sidebar items
	const secondaryMenuItems = moveItems(
		isMobile
			? [
					...secondaryMenu,
					{
						text: '',
						menu: [primaryMenuToggle, ...primaryMenu].filter(v => v.stickOnMobile !== true),
					},
			  ]
			: secondaryMenu,
	);

	const secondaryMenuComp =
		secondaryMenuItems.length > 0 ? (
			<div>
				<LayoutItemBar
					name="sidebar"
					items={secondaryMenuItems}
					inverted
					vertical
					className={isMobile && !menuOpen ? `${styles.sidebar} ${styles.sidebarHidden} imperiumSidebar` : `${styles.sidebar} imperiumSidebar`}
				/>
			</div>
		) : null;

	// Determine footer items
	const footerItems = moveItems(footer);
	const footerComp =
		footerItems.length > 0 ? (
			<LayoutItemBar name="footer" items={footerItems} className={`${styles.footer} imperiumFooter`} inverted borderless />
		) : null;

	// Determine status bar items
	const statusbarItems = moveItems(statusbar);
	const statusbarComp =
		statusbarItems.length > 0 ? (
			<LayoutItemBar name="statusbar" items={statusbarItems} inverted className={`${styles.statusbar} imperiumStatusbar`} />
		) : null;

	return (
		<div className={`${styles.parent} imperiumLayout`}>
			<div>
				<LayoutItemBar name="menubar" items={primaryMenuItems} inverted borderless className={`${styles.menubar} imperiumMenubar`} />
				{statusbarComp}
			</div>
			<Segment attached className={`${styles.contentWrapper} imperiumContentWrapper`}>
				{secondaryMenuComp}
				<div className={`${styles.content} imperiumContent`}>{children}</div>
			</Segment>
			{footerComp}
		</div>
	);
}
