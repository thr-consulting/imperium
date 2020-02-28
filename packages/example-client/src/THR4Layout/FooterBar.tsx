import debug from 'debug';
import get from 'lodash/get';
import {Menu} from 'semantic-ui-react';
import React, {useContext} from 'react';
import {MenuContext} from './THR4Layout';

const d = debug('app.THR4Layout.FooterBar');

export default function FooterBar() {
	const [state] = useContext(MenuContext);
	const profile = get(state, 'currentUser.profile.firstName', '').concat(' ', get(state, 'currentUser.profile.lastName', ''));

	return (
		<Menu inverted borderless style={{borderRadius: 0, margin: 0, backgroundColor: 'rgb(45, 45, 45)'}}>
			<Menu.Item name="home" style={{color: 'rgb(217, 128, 48)'}}>
				Footer Bar
			</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item name="logout" onClick={() => {}}>
					{profile ? `Logged in as: ${profile}` : 'You are not logged in'}
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
}
