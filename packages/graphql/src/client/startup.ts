import debug from 'debug';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';
import {StartupData} from '@imperium/core';

const d = debug('imperium.graphql.client.startup');

export default function startup({graphql, jwt_localstorage_name, rtoken_localstorage_name}, state): StartupData { // eslint-disable-line @typescript-eslint/camelcase
	d('Creating Apollo client');
	d(state);

	// Create Apollo HTTP link
	const httpLink = createHttpLink({uri: graphql});

	// Create Apollo middleware link (for authorization)
	const middlewareLink = new ApolloLink((operation, forward) => {
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
			d('isTokenValidOrUndefined');
			const token = window.localStorage.getItem(jwt_localstorage_name);
			if (!token) return true;
			const decodedToken = jwt.decode(token);
			if (!decodedToken || !decodedToken.exp) return false;
			// return false; // TODO temp override
			return Date.now() / 1000 <= decodedToken.exp;
		},
		// fetchAccessToken: () => {
		// 	return fetch(getEndpoint('getAccessTokenPath'), {
		// 		method: 'GET',
		// 		headers: {
		// 			Authorization: `Bearer ${getAccessToken()}`,
		// 			'refresh-token': getRefreshToken(),
		// 		},
		// 	});
		// },
		fetchAccessToken: () => {
			d('fetchAccessToken');

			return fetch('/api/rtoken', { // eslint-disable-line no-undef
				headers: {
					Authorization: `Bearer ${jwt}`,
					'refresh-token': window.localStorage.getItem(rtoken_localstorage_name) || '',
				},
			});
		},
		// handleFetch: accessToken => {
		// 	const accessTokenDecrypted = jwtDecode(accessToken);
		// 	setAccessToken(accessToken);
		// 	setExpiresIn(parseExp(accessTokenDecrypted.exp).toString());
		// },
		handleFetch: accessToken => {
			d('handleFetch');
			d(accessToken);
			window.localStorage.setItem(jwt_localstorage_name, accessToken);
		},
		// handleResponse: (operation, accessTokenField) => response => {
		// 	d('handleResponse');
		// 	d(operation, accessTokenField);
		// 	// here you can parse response, handle errors, prepare returned token to
		// 	// further operations
		//
		// 	// returned object should be like this:
		// 	// {
		// 	//    access_token: 'token string here'
		// 	// }
		// },
		handleError: err => {
			d('handleError');
			d('Your refresh token is invalid. Try to relogin');
			d(err);
			// full control over handling token fetch Error

			// your custom action here
			// user.logout();
		},
	});

	const apolloLink = ApolloLink.from([
		refreshLink,
		middlewareLink,
		httpLink,
	]);
	// const apolloLink = refreshLink.concat(middlewareLink.concat(httpLink));

	// Configure Apollo GraphQL client
	const apolloClient = new ApolloClient(({
		link: apolloLink,
		cache: new InMemoryCache(),
	}));

	return {
		apolloClient,
	};
}
