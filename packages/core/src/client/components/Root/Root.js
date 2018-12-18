// @flow
/* eslint-disable react/prefer-stateless-function */

import React, {Component} from 'react';
// import debug from 'debug';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import RouteDirector from '@thx/router';
import routeDefaults from 'routeDefaults';
import './root.css';

// const d = debug('imperium.core.Root');

type Props = {
	store: Object,
	routes: Object[],
	render: () => void,
};

/**
 * The root component
 */
export default class Root extends Component<Props> {
	props: Props;

	render() {
		const {store, routes, render} = this.props;
		const inner = ({checkPermissions}) => (
			<Router>
				<RouteDirector routes={routes} defaults={routeDefaults} checkPermissions={checkPermissions}/>
			</Router>
		);
		return (
			<Provider store={store}>
				<div>
					{render(inner)}
				</div>
			</Provider>
		);
	}

	/*
	render() {
		const {store, apolloClient, routes} = this.props;
		return (
			<ApolloProvider client={apolloClient}>
				<Provider store={store}>
					<div>
						<NotificationSystem>
							<DialogSystem>
								<Router>
									<RouteDirector routes={routes} defaults={routeDefaults}/>
								</Router>
							</DialogSystem>
						</NotificationSystem>
					</div>
				</Provider>
			</ApolloProvider>
		);
	}
	*/
}
