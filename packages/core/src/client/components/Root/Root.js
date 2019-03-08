// @flow
/* eslint-disable react/prefer-stateless-function */

import React, {Component} from 'react';
import debug from 'debug';
import {BrowserRouter as Router} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {RouteDirector} from '@thx/router';
import routeDefaults from 'routeDefaults';
import './root.css';

const d = debug('imperium.core.Root');

type Props = {
	routes: Object[],
	render: () => void,
	startupData?: Object,
};

/**
 * The root component
 */
class Root extends Component<Props> {
	props: Props;

	render() {
		d('Rendering Root component');
		const {routes, render, startupData} = this.props;

		const Child = props => (
			<Router>
				<RouteDirector routes={routes} defaults={routeDefaults} {...props}/>
			</Router>
		);

		return (
			<div>
				{render({Child, ...startupData})}
			</div>
		);
	}
}

export default hot(Root);
