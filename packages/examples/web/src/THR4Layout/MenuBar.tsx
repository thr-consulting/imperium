import debug from 'debug';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import React, {useContext} from 'react';
import {Menu, Dropdown, Icon, Breadcrumb, Input} from 'semantic-ui-react';
import {MenuContext} from './THR4Layout';

const d = debug('app.THR4Layout.MenuBar');

interface MenuItem {
	component: JSX.Element; // the element to render
	priority?: number; // if no priority is given it will be added to the end
	isVisible: (contextType: string, contextObject?: Record<string, unknown>) => boolean; // the route at which to display the component. If not specified, the component will always be shown
	// permissions?: string[]; // if no permission is given everyone will be able to see this
	// contextType?: string[]; // if no context type is given it will always be displayed
}
interface Props {
	route: {path: string};
}

const friendOptions = [
	{
		key: 'Jenny Hess',
		text: 'Jenny Hess',
		value: 'Jenny Hess',
		image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
	},
	{
		key: 'Elliot Fu',
		text: 'Elliot Fu',
		value: 'Elliot Fu',
		image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'},
	},
	{
		key: 'Stevie Feliciano',
		text: 'Stevie Feliciano',
		value: 'Stevie Feliciano',
		image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'},
	},
	{
		key: 'Christian',
		text: 'Christian',
		value: 'Christian',
		image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg'},
	},
	{
		key: 'Matt',
		text: 'Matt',
		value: 'Matt',
		image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'},
	},
	{
		key: 'Justen Kitsune',
		text: 'Justen Kitsune',
		value: 'Justen Kitsune',
		image: {avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg'},
	},
];
const menuItems: MenuItem[] = [
	{
		component: <div>display on home</div>,
		priority: 2,
		isVisible: contextType => contextType === '/',
	},
	{
		component: <div>display on sample</div>,
		priority: 2,
		isVisible: contextType => contextType === '/sample',
	},
	{
		component: <div>sample</div>,
		priority: 2,
		isVisible: contextType => contextType === '/sample',
	},
	{
		component: <div>home</div>,
		priority: 2,
		isVisible: contextType => contextType === '/',
	},
	{
		component: <Dropdown key="dropdown" placeholder="Select Friend" selection options={friendOptions} />,
		priority: 5,
		isVisible: () => true,
	},
	{
		component: <Input key="input" label="Input" />,
		priority: 5,
		isVisible: contextType => contextType === '/user',
	},
	{
		component: (
			<Breadcrumb key="breadcrumb">
				<Breadcrumb.Section link>Home</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section link>Store</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section active>T-Shirt</Breadcrumb.Section>
			</Breadcrumb>
		),
		priority: 2,
		isVisible: contextType => contextType === '/user' || contextType === '/client',
	},
	{
		component: (
			<Dropdown key="dropdownMenu" item icon="wrench" simple>
				<Dropdown.Menu>
					<Dropdown.Item>
						<Icon name="dropdown" />
						<span className="text">New</span>

						<Dropdown.Menu>
							<Dropdown.Item>Document</Dropdown.Item>
							<Dropdown.Item>Image</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown.Item>
					<Dropdown.Item>Open</Dropdown.Item>
					<Dropdown.Item>Save...</Dropdown.Item>
					<Dropdown.Item>Edit Permissions</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Header>Export</Dropdown.Header>
					<Dropdown.Item>Share</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		),
		priority: 2,
		isVisible: contextType => contextType === '/user' || contextType === '/client',
	},
];

export default function MenuBar(props: Props) {
	const [menuState] = useContext(MenuContext);

	if (menuItems.length < 1) return <></>;
	const sortedMenuItems = sortBy(menuItems, 'priority');

	return (
		<Menu style={{margin: 0, borderRadius: 0, backgroundColor: 'rgb(45, 45, 45)'}} borderless inverted>
			<Menu.Item fitted="vertically">
				<label style={{color: 'rgb(189, 197, 73)', fontSize: '1.5em'}}>
					{get(menuState, 'currentUser.profile.id', '0000')} - {get(menuState, 'currentUser.profile.firstName', '0000')}{' '}
					{get(menuState, 'currentUser.profile.lastName', '0000')}
				</label>
			</Menu.Item>
			{!menuState.isMobile &&
				sortedMenuItems.map((item, index) => {
					if (item.isVisible(props.route.path)) {
						return (
							<Menu.Item key={index.toString()} fitted="vertically">
								{item.component}
							</Menu.Item>
						);
					}
					return null;
				})}
		</Menu>
	);
}
