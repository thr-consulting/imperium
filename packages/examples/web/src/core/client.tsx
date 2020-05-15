import React from 'react';
import debug from 'debug';
import 'semantic-ui-css/semantic.min.css';
import ImperiumClient from '@imperium/client';
import {RouteDirector} from '@imperium/router';
import clientModules from './clientModules';
import DefaultComponent from './DefaultComponent';
import THR4Layout from '../THR4Layout/THR4Layout';
import HeaderBar from '../THR4Layout/HeaderBar';
import SideMenu from '../THR4Layout/SideMenu';
import FooterBar from '../THR4Layout/FooterBar';
import MenuBar from '../THR4Layout/MenuBar';
import '../THR4Layout/styles.css';

const d = debug('app.client');

const client = new ImperiumClient({
	clientModules,
	render(props) {
		return (
			<RouteDirector
				routeDefaults={{
					layout: THR4Layout,
					menu: HeaderBar,
					statusbar: MenuBar,
					sidebar: SideMenu,
					footer: FooterBar,
					redirect: false,
				}}
				rootRoute={{path: '/', content: DefaultComponent, exact: true}}
				{...props}
			/>
		);
	},
});

client.start().catch(err => {
	d(err);
});
