import debug from 'debug';
import {actionType} from '@thx/ducks';
import {Map} from 'immutable';

const d = debug('imperium.auth.client.redux');

const {jwt_localstorage_name} = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle,camelcase

const initialState = new Map({
	userId: null,
	permissions: [],
	user: null,
});

const {SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNOUT} = actionType('AUTH');

export default function(state = initialState, action) {
	const {authData: {userId, permissions = [], user} = {}, type} = action;

	switch (type) {
		case SIGNIN_SUCCESS:
			return state
				.set('userId', userId)
				.set('permissions', permissions)
				.set('user', user);

		case SIGNOUT:
			return initialState;

		default:
			return state;
	}
}

export function signInSuccess(signInRet) {
	d('Sign in success:', signInRet);
	window.localStorage.setItem(jwt_localstorage_name, signInRet.jwt);
	return dispatch => {
		dispatch({
			type: SIGNIN_SUCCESS,
			authData: signInRet.auth,
		});
	};
}

export function signInError(err) {
	d('Sign in error:', err);
	return {
		type: SIGNIN_ERROR,
	};
}

/**
 * Signs out the user.
 * @param apolloClient
 * @param history
 * @returns {function(*)}
 */
export function signOut(apolloClient, history) {
	return dispatch => {
		d('Signing out');
		window.localStorage.removeItem(jwt_localstorage_name);
		apolloClient.resetStore();
		history.push('/');
		dispatch({
			type: SIGNOUT,
		});
	};
}
