/* eslint-disable camelcase */
import debug from 'debug';
import {render} from 'react-dom';
import React from 'react';
import isArray from 'lodash/isArray';
import {AppContainer} from 'react-hot-loader';
import {fromJSON} from 'transit-immutable-js';
// import {ApolloClient} from 'apollo-client';
// import {ApolloLink} from 'apollo-link';
// import {createHttpLink} from 'apollo-link-http';
// import {InMemoryCache} from 'apollo-cache-inmemory';
import {decode} from 'jsonwebtoken';
import {Map} from 'immutable';
// import {dateInit} from '@thx/date-ui';
import 'whatwg-fetch';
import clientModules from 'clientModules';
import {rootRoute} from 'routeDefaults';
import makeStore from './redux/makeStore';
import RootComponent from './components/Root';

const d = debug('imperium.core.client');

d('>>> CLIENT ENTRY');

// Get initial configuration from server
const {graphql, jwt_localstorage_name} = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle,camelcase

// Create Apollo HTTP link
// const httpLink = createHttpLink({uri: graphql});

// Create Apollo middleware link (for authorization)
// const middlewareLink = new ApolloLink((operation, forward) => {
// 	const jwt = window.localStorage.getItem(jwt_localstorage_name);
// 	if (jwt) {
// 		operation.setContext({
// 			headers: {
// 				Authorization: `Bearer ${jwt}`,
// 			},
// 		});
// 	}
// 	return forward(operation);
// });
// const apolloLink = middlewareLink.concat(httpLink);

// Configure Apollo GraphQL client
// const apolloClient = new ApolloClient(({
// 	link: apolloLink,
// 	cache: new InMemoryCache(),
// }));

/**
 * Merge module routes into a single array
 * @param modules
 */
function mergeModuleRoutes(modules) {
	return modules.reduce((memo, module) => {
		if (module.routes && isArray(module.routes)) return [...memo, ...module.routes];
		return memo;
	}, [rootRoute]);
}

/**
 * Render the root component into the DOM
 * @param Root
 * @param store
 * @param routes
 */
function renderRoot(Root, store, routes) {
	render(
		<AppContainer>
			<Root store={store} routes={routes}/>
		</AppContainer>,
		document.getElementById('root')
	);
	// <Root store={store} apolloClient={apolloClient} routes={routes}/>
}

// Starts the app from a certain initial state;
function startFromState(initState) {
	// Load modules - Runs module definition functions and stores the objects
	d('Loading modules');
	const modules = clientModules.map(moduleFunc => moduleFunc());

	// Hydrate the initial state (convert to Immutable) FIXME This won't work because fromJS will convert the ENTIRE object.
	const initialState = initState ? fromJSON(initState) : new Map();

	// Create the Redux store
	const store = makeStore(initialState, modules);

	// Initialize the date system
	// dateInit();

	// Run any module specific startup code
	// TODO do this

	// Merge module routes
	const routes = mergeModuleRoutes(modules);

	// Render root component
	renderRoot(RootComponent, store, routes);

	// Hot Module Replacement API
	if (module.hot) {
		module.hot.accept('./components/Root', () => {
			// Load new Root component and re-render
			const newRoot = require('./components/Root').default; // eslint-disable-line global-require
			renderRoot(newRoot, store, routes);
		});
		module.hot.accept('clientModules', () => {
			// Load new client modules and re-render
			const mods = require('clientModules').default; // eslint-disable-line no-shadow,global-require
			const routs = mergeModuleRoutes(mods.map(moduleFunc => moduleFunc()));
			renderRoot(RootComponent, store, routs);
		});
	}

	d('App is ready');
}

// Checks the status of a response and throws an error
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

const jwt = window.localStorage.getItem(jwt_localstorage_name);
if (jwt) {
	/*
	const {exp} = decode(jwt);
	if (!exp || exp < (Date.now().valueOf() / 1000)) {
		d('JWT expired');
		window.localStorage.removeItem(jwt_localstorage_name);
		// Expired JWT, start with no auth info.
		startFromState();
	} else {
		// Attempt to fetch the initial state. JWT Must be valid.
		d('Fetching initial state');
		fetch('/api/initial-state', { // eslint-disable-line no-undef
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
			.then(checkStatus)
			.then(res => res.json())
			.then(startFromState)
			.catch(err => {
				// Something failed authorizing JWT, start with no auth info
				d(`Error authorizing JWT: ${err}`);
				startFromState();
			});
	}
	*/
} else {
	// We don't have a JWT, so just start with no auth info
	startFromState();
}
