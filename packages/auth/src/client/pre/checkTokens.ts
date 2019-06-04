import debug from 'debug';
import 'whatwg-fetch';
import {decode} from 'jsonwebtoken';
import {InitialState} from '@imperium/core';

const d = debug('imperium.auth.checkTokens');

// Checks the status of a response and throws an error
function checkStatus(response): Express.Response {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	// @ts-ignore
	error.response = response;
	throw error;
}

function isTokenExpired(token) {
	return Date.now() / 1000 > token.exp;
}

function fetchInitialState(token) {
	d('Fetching initial state');
	return fetch('/api/initial-state', { // eslint-disable-line no-undef
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(checkStatus)
		// @ts-ignore
		.then(res => res.json());
}

async function getRefreshedToken(token): Promise<string | null> {
	d('Getting a new JWT token');
	const res = await fetch('/api/rtoken', { // eslint-disable-line no-undef
		headers: {
			'refresh-token': token,
		},
	});

	if (res) {
		if (res.status === 200) {
			const jsonResult = await res.json();
			return jsonResult.access_token;
		}
	}
	return null;
}

export default async function checkTokens(initialConf): Promise<InitialState> {
	// Get initial configuration from server
	const {jwt_localstorage_name, rtoken_localstorage_name} = initialConf; // eslint-disable-line @typescript-eslint/camelcase

	try {
		d('Checking JWT and RToken');
		// If the JWT is defined and not expired, get the initial state from the server.
		// Otherwise just start the client with no initial state.
		const jwt = window.localStorage.getItem(jwt_localstorage_name);
		const rtoken = window.localStorage.getItem(rtoken_localstorage_name);
		const decodedJWT = decode(jwt);
		const decodedRToken = decode(rtoken);

		if (rtoken && decodedRToken && !isTokenExpired(decodedRToken)) {
			if (jwt && decodedJWT && !isTokenExpired(decodedJWT)) {
				d('JWT is valid');
				return fetchInitialState(jwt);
			}

			d('JWT is missing or invalid, refreshing');
			const newToken = await getRefreshedToken(rtoken);
			if (newToken) {
				window.localStorage.setItem(jwt_localstorage_name, newToken);
				return fetchInitialState(newToken);
			}
		}
	} catch (err) {
		d('Error decoding access tokens');
	}

	// RToken is not valid in some way, remove invalid tokens
	d('Token is missing or invalid');
	window.localStorage.removeItem(jwt_localstorage_name);
	window.localStorage.removeItem(rtoken_localstorage_name);

	return {};
}
