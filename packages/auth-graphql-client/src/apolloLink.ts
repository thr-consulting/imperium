import debug from 'debug';
import {ApolloLink} from '@apollo/client';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import decode from 'jwt-decode';
import type {AccessToken} from '@imperium/auth-client';
import type {IImperiumClient} from '@imperium/client';

const d = debug('imperium.auth-graphql-client.apolloLink');

export function createLinks(client: IImperiumClient) {
	// Create Apollo middleware link (for authorization)
	d('Creating auth Apollo link');
	const authLink = new ApolloLink((operation, forward) => {
		const token = window.localStorage.getItem(client.globalConst.authLSAccessTokenKey as string);
		if (token) {
			operation.setContext({
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		return forward(operation);
	});

	d('Creating refresh Apollo link');
	const refreshLink = new TokenRefreshLink({
		// This fieldname is set in the @imperium/auth-server:src/models/Auth.ts file in the refresh() method.
		accessTokenField: 'access',
		isTokenValidOrUndefined: () => {
			const token = window.localStorage.getItem(client.globalConst.authLSAccessTokenKey as string);
			if (!token) return true; // Empty token should be valid
			try {
				const decodedToken = decode(token) as AccessToken;
				if (!decodedToken || !decodedToken.exp) return false;
				return Date.now() / 1000 <= decodedToken.exp;
			} catch (err) {
				d('Error decoding access token');
				return false;
			}
		},
		fetchAccessToken: async () => {
			d('Fetching new access token');
			return fetch(client.globalConst.authRefreshUrl as string, {
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
			});
		},
		handleFetch: accessToken => {
			d('Fetched access token');
			window.localStorage.setItem(client.globalConst.authLSAccessTokenKey as string, accessToken);
		},
		handleError: () => {
			d('There was a problem refreshing the access token. Re-login required.');
			window.localStorage.removeItem(client.globalConst.authLSAccessTokenKey as string);
			window.localStorage.removeItem(client.globalConst.authLSIdKey as string);
			// TODO If we could forward to the login page at this point, that would be great!
		},
	});

	// This order matters!
	return [refreshLink, authLink];
}
