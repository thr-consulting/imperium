import debug from 'debug';
import {History} from 'history';
import sortBy from 'lodash/sortBy';
import React, {useContext} from 'react';
import {Icon, Input, Item, Menu, Accordion} from 'semantic-ui-react';
import {MenuContext} from './THR4Layout';

const d = debug('app.THR4Layout.SideMenu');

interface Props {
	menuItems;
	history: History;
	route: {path: string};
}
interface MenuItem {
	component: (props) => JSX.Element; // the component to render
	priority?: number; // if no priority is given it will be added to the end
	selectedRoute?: string | string[]; // this route will be used to set the components as selected in the menu when we hit the route
	isVisible: (contextType: string, contextObject?: object) => boolean; // a function that we can call to know if this components should be displayed or not
	// permissions?: string[]; // if no permission is given everyone will be able to see this
	// contextType?: string[]; // if no context type is given it will always be displayed
}

export default function SideMenu(props: Props): JSX.Element {
	const [menuState, setMenuState] = useContext(MenuContext);
	const menuItems: MenuItem[] = [
		{
			component: () => (
				<Input name="search" icon={<Icon name="search" inverted circular link />} placeholder="Search..." />
			),
			priority: 10,
			isVisible: (contextType: string) => {
				return contextType === '/';
			},
		},
		{
			component: () => (
				<Menu.Item>
					<li>test</li>
				</Menu.Item>
			),
			priority: 5,
			isVisible: (contextType: string) => {
				return contextType === '/client';
			},
		},
		{
			component: propss => (
				<Menu.Item
					onClick={() => {
						propss.history.push('/');
					}}
					icon="home"
					key="home"
					name="home"
				/>
			),
			priority: 1,
			isVisible: () => {
				return true;
			},
			selectedRoute: '/',
		},
		{
			component: propss => (
				<Menu.Item
					onClick={() => {
						propss.history.push('/sample');
					}}
					icon="code"
					key="sample"
					name="sample"
				/>
			),
			priority: 2,
			isVisible: () => {
				return true;
			},
			selectedRoute: '/sample',
		},
		{
			component: () => <Menu.Item icon="envelope" key="messages" name="messages" />,
			priority: 3,
			isVisible: (contextType: string) => {
				return contextType === '/client';
			},
		},
		{
			component: () => <Menu.Item icon="users" key="friends" name="friends" />,
			priority: 4,
			isVisible: (contextType: string) => {
				return contextType === '/user';
			},
		},
		{
			component: propss => {
				return (
					<Accordion as={Menu.Item} fitted>
						<Accordion.Title
							fitted="vertically"
							as={Menu.Item}
							onClick={() => setMenuState(prevState => ({...prevState, activeItem: !prevState.activeItem}))}
							active={menuState.activeItem}
						>
							<Icon name="sidebar" />
							Options
						</Accordion.Title>
						<Accordion.Content active={menuState.activeItem}>
							<Menu.Item onClick={() => propss.history.push('/user')}>User</Menu.Item>
							<Menu.Item onClick={() => propss.history.push('/client')}>Client</Menu.Item>
							<Menu.Item>Open</Menu.Item>
							<Menu.Item>Save...</Menu.Item>
							<Menu.Item>Edit Permissions</Menu.Item>
							<Menu.Item>Share</Menu.Item>
						</Accordion.Content>
					</Accordion>
				);
			},
			priority: 7,
			isVisible: () => {
				return true;
			},
			selectedRoute: ['/client', '/user'],
		},
		{
			component: () => {
				return (
					<Menu.Item
						onClick={() => {
							setMenuState(prevState => ({...prevState, showStatusBar: !prevState.showStatusBar}));
						}}
						key="Hide/show Menu Bar"
						icon={menuState.showStatusBar ? 'arrow up' : 'arrow down'}
						name={`${menuState.showStatusBar ? 'Hide' : 'Show'} Menu Bar`}
					/>
				);
			},
			priority: 6,
			isVisible: (contextType: string) => {
				return contextType === '/';
			},
		},
	];

	if (menuItems.length < 1) return <></>;
	const sortedMenuItems = sortBy(menuItems, 'priority');

	return sortedMenuItems.map((item, index) => {
		let active = false;
		if (item.selectedRoute) {
			if (typeof item.selectedRoute === 'string') active = item.selectedRoute === props.route.path;
			else if (typeof item.selectedRoute === 'object') active = item.selectedRoute.includes(props.route.path);
		}
		if (item.isVisible(props.route.path)) {
			return (
				<Menu.Item key={index.toString()} name={index.toString()} fitted as={Item} active={active}>
					<item.component {...props} />
				</Menu.Item>
			);
		}
		return null;
	});
}
