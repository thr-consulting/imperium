import debug from 'debug';
import sortBy from 'lodash/sortBy';
import React, {useContext} from 'react';
import {Menu, Input, Icon, Popup} from 'semantic-ui-react';
import {MenuContext} from './THR4Layout';

const d = debug('app.THR4Layout.HeaderBar');

interface Props {
	userMenu?: JSX.Element;
}

export default function HeaderBar(props: Props) {
	const [menuState, setMenuState] = useContext(MenuContext);

	const menuItems = [
		{
			component: (
				<Menu.Item fitted="vertically">
					<label>Test</label>
				</Menu.Item>
			),
			priority: 1,
			isVisible: isMobile => !isMobile,
		},
	];
	const sortedMenuItems = sortBy(menuItems, 'priority');

	return (
		<Menu inverted borderless style={{borderRadius: 0, margin: 0}}>
			{menuState.isMobile ? (
				<Menu.Item fitted="vertically">
					<Icon
						className={menuState.showSideMenu ? 'rotated clockwise' : undefined}
						name="sidebar"
						size="large"
						onClick={() => setMenuState(prevState => ({...prevState, showSideMenu: !menuState.showSideMenu}))}
					/>
				</Menu.Item>
			) : null}
			<Menu.Item name="home" style={{fontSize: '2em', padding: '.2em', color: 'rgb(217, 128, 48)'}}>
				THR CONSULTING
			</Menu.Item>
			{!menuState.isMobile &&
				sortedMenuItems.map((item, index) => {
					if (item.isVisible(menuState.isMobile)) {
						return (
							<Menu.Item key={index.toString()} fitted="vertically">
								{item.component}
							</Menu.Item>
						);
					}
					return null;
				})}
			{props.userMenu ? (
				<Menu.Menu position="right">
					{!menuState.isMobile && (
						<Menu.Item fitted="vertically" style={{floated: 'right'}} position="right">
							<Input icon={{name: 'search', circular: true, link: true}} placeholder="Search..." />
						</Menu.Item>
					)}
					<Popup
						on="click"
						trigger={<Icon name="sidebar" style={{color: 'rgb(217, 128, 48)'}} size="large" circular />}
						content={props.userMenu}
						position="bottom right"
					/>
				</Menu.Menu>
			) : null}
		</Menu>
	);
}
