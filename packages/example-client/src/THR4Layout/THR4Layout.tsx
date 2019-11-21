import debug from 'debug';
import {Menu, Segment, Sidebar} from 'semantic-ui-react';
import React, {useState, createContext, useEffect} from 'react';
import UserMenu from './UserMenu';
// @ts-ignore
import styles from './styles.css';

const d = debug('app.THR4Layout.THR4Layout');

interface Props {
	route: {
		sidebar: React.ElementType;
		statusbar: React.ElementType;
		content: React.ElementType;
		menu: React.ElementType;
		footer: React.ElementType;
	};
}
interface MenuState {
	currentUser?: {profile: {firstName: string; lastName: string; id: string}};
	showStatusBar: boolean;
	showSideMenu: boolean;
	activeItem: string;
	isMobile: boolean;
}
// @ts-ignore
export const MenuContext = createContext<[MenuState, () => {}]>([{}, () => {}]);

export default function THR4Layout(props: Props) {
	const [menuState, setMenuState] = useState({
		showStatusBar: true,
		showSideMenu: true,
		currentUser: {},
		isMobile: window.innerWidth < 900,
	});

	const menu = props.route.menu ? (
		<props.route.menu {...props} userMenu={<UserMenu MenuContext={MenuContext} />} />
	) : null;

	const statusbar = props.route.statusbar ? <props.route.statusbar {...props} /> : null;

	const sidebar = props.route.sidebar ? (
		<div className={styles.menu}>
			<props.route.sidebar {...props} />
		</div>
	) : null;

	const content = props.route.content ? <props.route.content {...props} /> : null;

	const footer = props.route.footer ? <props.route.footer {...props} /> : null;

	useEffect(() => {
		function onResize(ev) {
			setMenuState(prevState => ({...prevState, isMobile: ev.target.innerWidth < 900}));
		}
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	return (
		<div className={styles.parent}>
			<MenuContext.Provider value={[menuState, setMenuState]}>
				<div className={styles.header}>
					{menu}
					{menuState.showStatusBar && statusbar}
				</div>
				{menuState.isMobile ? (
					<Sidebar.Pushable attached as={Segment} className={styles.wrapper}>
						<Sidebar
							as={Menu}
							animation="slide along"
							inverted
							onHide={() => setMenuState(prevState => ({...prevState, showSideMenu: false}))}
							vertical
							visible={menuState.showSideMenu}
						>
							{sidebar}
						</Sidebar>
						<Sidebar.Pusher>
							<Segment basic>
								<div className={styles.content}>{content}</div>
							</Segment>
						</Sidebar.Pusher>
					</Sidebar.Pushable>
				) : (
					<Segment attached className={styles.wrapper}>
						<Menu vertical style={{borderRadius: 0, margin: 0}} inverted>
							{sidebar}
						</Menu>
						<div className={styles.content}>{content}</div>
					</Segment>
				)}
				{footer}
			</MenuContext.Provider>
		</div>
	);
}
