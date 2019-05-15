/* eslint-disable @typescript-eslint/camelcase */
import debug from 'debug';
import {InitialState} from '@imperium/core';
import {ApolloLink} from 'apollo-link';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';

const d = debug('imperium.auth.apolloLinks');

export default async function apolloLinks({jwt_localstorage_name, rtoken_localstorage_name}, initialState): Promise<InitialState> {
	// Create Apollo middleware link (for authorization)
	const authLink = new ApolloLink((operation, forward) => {
		const token = window.localStorage.getItem(jwt_localstorage_name);
		if (token) {
			operation.setContext({
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		// @ts-ignore
		return forward(operation);
	});

	const refreshLink = new TokenRefreshLink({
		accessTokenField: 'access_token',
		isTokenValidOrUndefined: () => {
			const token = window.localStorage.getItem(jwt_localstorage_name);
			if (!token) return true;
			try {
				const decodedToken = jwt.decode(token);
				if (!decodedToken || !decodedToken.exp) return false;
				return Date.now() / 1000 <= decodedToken.exp;
			} catch (err) {
				d('Error decoding access token');
				return false;
			}
		},
		fetchAccessToken: () => {
			d('Fetching new access token');

			return fetch('/api/rtoken', { // eslint-disable-line no-undef
				headers: {
					'refresh-token': window.localStorage.getItem(rtoken_localstorage_name) || '',
				},
			});
		},
		handleFetch: accessToken => {
			window.localStorage.setItem(jwt_localstorage_name, accessToken);
		},
		handleError: err => {
			d('There was a problem refreshing the access token. Re-login required.');
			window.localStorage.removeItem(jwt_localstorage_name);
			window.localStorage.removeItem(rtoken_localstorage_name);
			// TODO If we could forward to the login page at this point, that would be great!
		},
	});

	// If some other module has already defined some apolloLinks, we want to add to them.
	if (initialState && initialState.apolloLinks) {
		return {
			apolloLinks: [
				...initialState.apolloLinks,
				refreshLink,
				authLink,
			],
		};
	}

	// Return apollo links
	return {
		apolloLinks: [
			refreshLink,
			authLink,
		],
	};
}
