import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import styles from './styles.css';

export default function Sidebar() {
	return (
		<Menu vertical className={styles.sidebar} inverted>
			<Menu.Item link as={Link} to="/sample">
				Sample Route
			</Menu.Item>
			<Menu.Item link as={Link} to="/sample-graphql">
				Graphql
			</Menu.Item>
			<Menu.Item link as={Link} to="/login">
				Login
			</Menu.Item>
			<Menu.Item link as={Link} to="/auth-test">
				Auth Test
			</Menu.Item>
		</Menu>
	);
}
