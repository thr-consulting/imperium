import debug from 'debug';
import React from 'react';
import {Header, Image, Menu, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import styles from './styles.css';
import imperiumLogo from './imperium_w.png';

const d = debug('app.layout');

export function Layout(props: any) {
	return (
		<div className={styles.parent}>
			<div>
				<Menu inverted borderless className={styles.menu}>
					<Menu.Item name="home" className={styles.menuHeader} as={Link} to="/">
						<Header inverted>
							<Image src={imperiumLogo} size="mini" />
							Imperium
						</Header>
					</Menu.Item>
				</Menu>
				<Menu className={styles.infoBar} inverted>
					<Menu.Item fitted="vertically">
						<Menu.Item>Info Bar</Menu.Item>
					</Menu.Item>
				</Menu>
			</div>
			<Segment attached className={styles.contentWrapper}>
				<div>
					<props.route.sidebar />
				</div>
				<div className={styles.content}>
					<props.route.content {...props} />
				</div>
			</Segment>
			<Menu style={{margin: 0, borderRadius: 0, backgroundColor: 'rgb(45, 45, 45)'}} borderless inverted>
				<Menu.Item fitted="vertically">Footer</Menu.Item>
			</Menu>
		</div>
	);
}
