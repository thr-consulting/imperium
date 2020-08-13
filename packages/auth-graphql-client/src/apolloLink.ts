import debug from 'debug';
import {ApolloLink} from '@apollo/client';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import {isTokenValidOrUndefined, fetchAccessToken} from '@imperium/auth-client';
import type {IImperiumClient} from '@imperium/client';

const d = debug('imperium.auth-graphql-client.apolloLink');

export function createLinks(client: IImperiumClient): ApolloLink[] {
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
	const refreshLink = (new TokenRefreshLink({
		// This fieldname is set in the @imperium/auth-server:src/models/Auth.ts file in the refresh() method.
		accessTokenField: 'access',
		isTokenValidOrUndefined: () => {
			return isTokenValidOrUndefined(client);
		},
		fetchAccessToken: async () => {
			return fetchAccessToken(client);
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
	}) as unknown) as ApolloLink;

	// This order matters!
	return [refreshLink, authLink];
}
