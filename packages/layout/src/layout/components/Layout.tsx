import debug from 'debug';
import {ReactNode, useState} from 'react';
import {AppShell, Aside, Burger, Footer, Header, MediaQuery, Navbar, Text, useMantineTheme} from '@mantine/core';
import type {CustomLayoutItem, LayoutData} from '../types';
import {moveItems} from '../moveItems';
import {LayoutItemBar} from './LayoutItemBar';
import type {HorizontalPositionedItem} from '../../commonItems';

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
	// const {isMobile} = useLayoutState();
	const theme = useMantineTheme();
	const [menuOpen, setMenuOpen] = useState(false);

	const barHeight = (theme.lineHeight as number) * theme.fontSizes.md + theme.spacing.sm * 2;
	console.log('LineHeight:', theme.lineHeight);
	console.log('MD Font   :', theme.fontSizes.md);
	console.log('SM Spacing:', theme.spacing.sm);
	console.log('BarHeight :', barHeight);

	// TODO this needs a fix
	const isMobile = false;

	const primaryMenuToggle: CustomLayoutItem & HorizontalPositionedItem = {
		stickOnMobile: true,
		weight: -19999,
		render: () => {
			return (
				<MediaQuery largerThan="sm" styles={{display: 'none'}}>
					<Burger opened={menuOpen} onClick={() => setMenuOpen(o => !o)} size="sm" color={theme.colors.gray[6]} />
				</MediaQuery>
			);
		},
	};

	// Determine menubar items
	const primaryMenuItems = moveItems(
		isMobile ? [primaryMenuToggle, ...primaryMenu].filter(v => v.stickOnMobile === true) : [primaryMenuToggle, ...primaryMenu],
	);

	// Determine navbar items
	const secondaryMenuItems = moveItems(
		isMobile
			? [
					...secondaryMenu,
					{
						text: '',
						menu: primaryMenu.filter(v => v.stickOnMobile !== true),
					},
			  ]
			: secondaryMenu,
	);

	// const secondaryMenuComp =
	// 	secondaryMenuItems.length > 0 ? (
	// 		<div className="imperiumSecondaryMenuWrapper">
	// 			<LayoutItemBar
	// 				items={secondaryMenuItems}
	// 				inverted
	// 				vertical
	// 				className={
	// 					isMobile && !menuOpen
	// 						? `${styles.secondaryMenu} ${styles.secondaryMenuHidden} imperiumSecondaryMenu`
	// 						: `${styles.secondaryMenu} imperiumSecondaryMenu`
	// 				}
	// 			/>
	// 		</div>
	// 	) : null;

	// Determine footer items
	// const footerItems = moveItems(footer);
	// const footerComp =
	// 	footerItems.length > 0 ? (
	// 		<LayoutItemBar name="footer" items={footerItems} className={`${styles.footer} imperiumFooter`} inverted borderless />
	// 	) : null;

	// // Determine status bar items
	// const statusbarItems = moveItems(statusbar);
	// const statusbarComp =
	// 	statusbarItems.length > 0 ? <LayoutItemBar items={statusbarItems} inverted className={`${styles.statusbar} imperiumStatusbar`} /> : null;

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			navbar={
				<Navbar p="md" hiddenBreakpoint="sm" hidden={!menuOpen} width={{sm: 200, lg: 300}}>
					<Text>Application navbar</Text>
				</Navbar>
			}
			aside={
				<MediaQuery smallerThan="sm" styles={{display: 'none'}}>
					<Aside p="md" hiddenBreakpoint="sm" width={{sm: 200, lg: 300}}>
						<Text>Sidebar</Text>
					</Aside>
				</MediaQuery>
			}
			footer={
				<Footer height={barHeight} p="md">
					Application footer
				</Footer>
			}
			header={
				<Header height={barHeight}>
					<LayoutItemBar items={primaryMenuItems} className="imperiumPrimaryMenu" />
				</Header>
			}
		>
			{children}
		</AppShell>
	);
	// return (
	// 	<div className={`${styles.parent} imperiumLayout ${isMobile ? 'imperiumMobile' : 'imperiumNotMobile'}`}>
	// 		<div className="imperiumPrimaryMenuWrapper">
	// 			<LayoutItemBar items={primaryMenuItems} inverted borderless className={`${styles.menubar} imperiumPrimaryMenu`} />
	// 			{statusbarComp}
	// 		</div>
	// 		<Segment attached className={`${styles.contentWrapper} imperiumLayoutContentWrapper`}>
	// 			{secondaryMenuComp}
	// 			<div className={`${styles.content} imperiumLayoutContent`}>{children}</div>
	// 		</Segment>
	// 		{footerComp}
	// 	</div>
	// );
}
