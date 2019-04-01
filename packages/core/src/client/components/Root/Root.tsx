/* eslint-disable react/prefer-stateless-function */

import React, {Component} from 'react';
import debug from 'debug';
import {BrowserRouter as Router} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
// @ts-ignore
import routeDefaults from 'routeDefaults';
import RouteDirector from '../RouteDirector';
import './root.css';

const d = debug('imperium.core.Root');

type Props = {
	routes: Object[],
	render: () => void,
	startupData?: Object,
};

function Root(props) {
	d('Rendering Root component');
	const {routes, render, startupData} = props;

	const Child = props => (
		<RouteDirector routes={routes} defaults={routeDefaults} {...props}/>
	);

	return (
		<Router>
			{render({Child, ...startupData})}
		</Router>
	);
}

export default hot(Root);
