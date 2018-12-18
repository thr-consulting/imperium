import debug from 'debug';
import thunkMiddleware from 'redux-thunk';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import {createStore, applyMiddleware, compose} from 'redux';
import makeReducer from './makeReducer';

const d = debug('imperium.core.client.redux');

const PROD = process.env.NODE_ENV === 'production';

/**
 * Create the Redux store
 * @param initialState
 * @param modules
 * @returns {*}
 */
export default function(initialState, modules) {
	d('Making store');
	let store;

	// Merge the module reducers
	const moduleReducers = modules.reduce((memo, module) => {
		if (module.reducers && isObject(module.reducers)) return merge(memo, module.reducers);
		return memo;
	}, {});

	// Create the root reducer
	const reducer = makeReducer(moduleReducers);

	// Redux middlewares
	const middlewares = [
		thunkMiddleware,
	];

	// Create the store
	if (PROD) {
		store = createStore(reducer, initialState, applyMiddleware(...middlewares));
	} else {
		// Check if the Redux devtools are available
		const devtoolsExt = global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__(); // eslint-disable-line no-underscore-dangle
		if (!devtoolsExt) {
			const {createLogger} = require('redux-logger'); // eslint-disable-line global-require
			const logger = createLogger({
				level: 'info',
				collapsed: true,
			});
			middlewares.push(logger);
		}
		store = createStore(reducer, initialState, compose(
			applyMiddleware(...middlewares),
			devtoolsExt || (f => f)
		));
	}

	// Hot Module Reloading
	if (module.hot) {
		module.hot.accept('./makeReducer', () => {
			d('Replacing reducer');
			const nextReducer = require('./makeReducer').default; // eslint-disable-line global-require
			store.replaceReducer(nextReducer(moduleReducers));
		});
	}

	return store;
}
