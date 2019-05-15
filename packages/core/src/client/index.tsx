/*
	TODO Typescript errors in this file:
	TS2339: https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
*/

/* eslint-disable camelcase */
import debug from 'debug';
import {render} from 'react-dom';
import React from 'react';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
// @ts-ignore
import clientModules from 'clientModules';
// @ts-ignore
import {rootRoute} from 'routeDefaults';
// @ts-ignore
import rootRender from 'rootRender';
import RootComponent from './components/Root';
import {ClientModule, ImperiumRoute, InitialConfig, StartupData} from '../../types';

const d = debug('imperium.core.client');

declare global {
	interface Window {
		__INITIAL_CONF__: InitialConfig,
	}
}

d('>>> CLIENT ENTRY');

// Load modules - Runs module definition functions and stores the objects
d('Loading modules: ', clientModules.map(v => v.name).join(', '));
const loadedModules = clientModules.map((moduleFunc): ClientModule => moduleFunc());

/**
 * Merge module routes into a single array
 * @param modules
 */
function mergeModuleRoutes(modules): ImperiumRoute[] {
	return modules.reduce((memo, module): ImperiumRoute[] => {
		if (module.routes && isArray(module.routes)) return [...memo, ...module.routes];
		return memo;
	}, [rootRoute]);
}

/**
 * Merge module fragments into a single object
 * @param modules
 * @return {any}
 */
function mergeModuleFragments(modules) {
	return modules.reduce((memo, module) => {
		if (module.fragments) {
			return {
				...memo,
				...module.fragments,
			};
		}
		return memo;
	}, {});
}

/**
 * Render the root component into the DOM
 * @param Root
 * @param routes
 * @param fragments
 * @param startupData
 */
function renderRoot(Root, routes, fragments, startupData): void {
	render(
		<Root
			routes={routes}
			fragments={fragments}
			render={rootRender}
			startupData={startupData}
		/>,
		document.getElementById('root')
	);
}

// Starts the app from a certain initial state;
function startFromState(initState?: {}): void {
	// Hydrate the initial state
	const initialState = initState || {};

	// Run any module specific startup code
	const startupData = loadedModules.reduce((memo, module): StartupData => {
		if (module.startup && isFunction(module.startup)) {
			return {
				...memo,
				...module.startup(window.__INITIAL_CONF__, initialState), // eslint-disable-line no-underscore-dangle
			};
		}
		return memo;
	}, {});

	// Merge module routes
	const routes = mergeModuleRoutes(loadedModules);

	// Graphql fragments
	const fragments = mergeModuleFragments(loadedModules);

	// Render root component
	renderRoot(RootComponent, routes, fragments, startupData);

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
		module.hot.accept('rootRender', (): void => {
			// d('HOT ACCEPT rootRender');
			// Load new Root component and re-render
			const newRoot = require('./components/Root').default; // eslint-disable-line global-require
			renderRoot(newRoot, routes, fragments, startupData);
		});

		module.hot.accept('routeDefaults', (): void => {
			renderRoot(RootComponent, routes, fragments, startupData);
		});

		/*
			When a client module changes we recreate the Redux store and reload the routes.
			We cannot re-run the startup logic. In this case you will have to refresh the page to load the new changes.
			In fact, if your module's startup code depends the Redux store, you may get strange errors when hot reloading.
		 */
		module.hot.accept('clientModules', (): void => {
			// d('HOT ACCEPT clientModules');
			// Load new client modules and re-render
			const mods = require('clientModules').default; // eslint-disable-line no-shadow,global-require
			const newRoutes = mergeModuleRoutes(mods.map((moduleFunc): ClientModule => moduleFunc()));
			const newFragments = mergeModuleFragments(mods.map((moduleFunc): ClientModule => moduleFunc()));
			// const newStore = makeStore(initialState, mods);
			renderRoot(RootComponent, newRoutes, newFragments, startupData);
		});
	}

	d('App is ready');
}

const initialStatePromise = loadedModules.reduce(async (memo, module): Promise<{}> => {
	const state = await memo;
	if (module.pre && isFunction(module.pre)) {
		// eslint-disable-next-line no-underscore-dangle
		const moreState = await module.pre(window.__INITIAL_CONF__);
		if (moreState) {
			return {
				...state,
				...moreState,
			};
		}
		return state;
	}
	return state;
}, Promise.resolve());

initialStatePromise.then(startFromState);
