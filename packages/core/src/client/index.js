/* eslint-disable camelcase */
import debug from 'debug';
import {render} from 'react-dom';
import React from 'react';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import {AppContainer} from 'react-hot-loader';
import {decode} from 'jsonwebtoken';
import 'whatwg-fetch';
import clientModules from 'clientModules';
import {rootRoute} from 'routeDefaults';
import rootRender from 'rootRender';
import RootComponent from './components/Root';

const d = debug('imperium.core.client');

d('>>> CLIENT ENTRY');

// Get initial configuration from server
const {jwt_localstorage_name} = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle,camelcase

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
 * @param routes
 * @param startupData
 */
function renderRoot(Root, routes, startupData) {
	render(
		<AppContainer>
			<Root
				routes={routes}
				render={rootRender}
				startupData={startupData}
			/>
		</AppContainer>,
		document.getElementById('root')
	);
}

// Starts the app from a certain initial state;
function startFromState(initState) {
	// Load modules - Runs module definition functions and stores the objects
	d('Loading modules');
	const modules = clientModules.map(moduleFunc => moduleFunc());

	// Hydrate the initial state
	const initialState = initState ? JSON.parse(initState) : {};

	// Run any module specific startup code
	const startupData = modules.reduce((memo, module) => {
		if (module.startup && isFunction(module.startup)) {
			return {
				...memo,
				...module.startup(window.__INITIAL_CONF__, initialState), // eslint-disable-line no-underscore-dangle
			};
		}
		return memo;
	}, {});

	// Merge module routes
	const routes = mergeModuleRoutes(modules);

	// Render root component
	renderRoot(RootComponent, routes, startupData);

	// Hot Module Replacement API
	if (module.hot) {
		// Only Needed For Imperium
		// module.hot.accept('./components/Root', () => {
		// 	d('HOT ACCEPT ./components/Root');
		// 	Load new Root component and re-render
		// 	const newRoot = require('./components/Root').default; // eslint-disable-line global-require
		//	renderRoot(newRoot, store, routes);
		// });

		// Reload For Implementing Project
		module.hot.accept('rootRender', () => {
			// d('HOT ACCEPT rootRender');
			// Load new Root component and re-render
			const newRoot = require('./components/Root').default; // eslint-disable-line global-require
			renderRoot(newRoot, routes, startupData);
		});

		/*
			When a client module changes we recreate the Redux store and reload the routes.
			We cannot re-run the startup logic. In this case you will have to refresh the page to load the new changes.
			In fact, if your module's startup code depends the Redux store, you may get strange errors when hot reloading.
		 */
		module.hot.accept('clientModules', () => {
			// d('HOT ACCEPT clientModules');
			// Load new client modules and re-render
			const mods = require('clientModules').default; // eslint-disable-line no-shadow,global-require
			const newRoutes = mergeModuleRoutes(mods.map(moduleFunc => moduleFunc()));
			// const newStore = makeStore(initialState, mods);
			renderRoot(RootComponent, newRoutes, startupData);
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

// If the JWT if defined and not expired, get the initial state from the server.
// Otherwise just start the client with no initial state.
const jwt = window.localStorage.getItem(jwt_localstorage_name);
if (jwt) {
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
} else {
	// We don't have a JWT, so just start with no auth info
	d('JWT not present');
	startFromState();
}
