import debug from 'debug';
import {type ReactNode, useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import {Segment} from 'semantic-ui-react';
import {moveItems} from '../moveItems';
import type {LayoutData} from '../types';
import {LayoutItemBar} from './LayoutItemBar';
import {SecondaryMenuToggleItem} from './SecondaryMenuToggleItem';
import styles from './styles.module.css';

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
	const isMobile = useMediaQuery({query: '(max-width: 900px)'});
	const [menuOpen, setMenuOpen] = useState(false);

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
		isMobile
			? [
					primaryMenuToggle,
					...primaryMenu.map(p => {
						return {...p, text: undefined};
					}),
				]
			: primaryMenu,
	);

	// Determine sidebar items
	const secondaryMenuItems = moveItems(secondaryMenu);

	const secondaryMenuComp =
		secondaryMenuItems.length > 0 ? (
			<div className="imperiumSecondaryMenuWrapper noPrint">
				<LayoutItemBar
					items={secondaryMenuItems}
					inverted
					vertical
					className={
						isMobile && !menuOpen
							? `${styles.secondaryMenu} ${styles.secondaryMenuHidden} imperiumSecondaryMenu`
							: `${styles.secondaryMenu} imperiumSecondaryMenu`
					}
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
		statusbarItems.length > 0 ? <LayoutItemBar items={statusbarItems} inverted className={`${styles.statusbar} imperiumStatusbar`} /> : null;

	return (
		<div className={`${styles.parent} imperiumLayout ${isMobile ? 'imperiumMobile' : 'imperiumNotMobile'}`}>
			<div className="imperiumPrimaryMenuWrapper">
				<LayoutItemBar items={primaryMenuItems} inverted borderless className={`${styles.menubar} imperiumPrimaryMenu`} />
				{statusbarComp}
			</div>
			<Segment attached className={`${styles.contentWrapper} imperiumLayoutContentWrapper`}>
				{secondaryMenuComp}
				<div className={`${styles.content} imperiumLayoutContent`}>{children}</div>
			</Segment>
			{footerComp}
		</div>
	);
}
