// @flow
/* eslint-disable react/prefer-stateless-function */

import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
// import {ApolloProvider} from 'react-apollo';
// import {RouteDirector} from '@thx/router';
// import {NotificationSystem} from '@thx/notifications';
// import {DialogSystem} from '@thx/dialog';
import routeDefaults from 'routeDefaults';
import './root.css';

type Props = {
	store: Object,
	// apolloClient: Object,
	routes: Object[],
};

/**
 * The root component
 */
export default class Root extends Component<Props> {
	props: Props;

	render() {
		const {store, routes} = this.props;
		return (
			<Provider store={store}>
				<div>
					root component
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
