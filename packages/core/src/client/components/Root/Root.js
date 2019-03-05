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

		const Child = ({AuthContext}) => (
			<Router>
				<RouteDirector routes={routes} defaults={routeDefaults} AuthContext={AuthContext}/>
			</Router>
		);

		return (
			<div>
				{render({Child, ...startupData})}
			</div>
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

export default hot(Root);
