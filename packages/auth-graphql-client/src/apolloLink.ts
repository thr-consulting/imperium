import debug from 'debug';
import {ApolloLink} from '@apollo/client';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import {Environment} from '@thx/env';
import {isTokenValidOrUndefined, fetchAccessToken} from '@imperium/auth-client';

const d = debug('imperium.auth-graphql-client.apolloLink');

export interface AuthGraphqlClientOptions {
	refreshFailed?: (err: Error) => void;
}

export function createLinks(options?: AuthGraphqlClientOptions) {
	return (): ApolloLink[] => {
		// Create Apollo middleware link (for authorization)
		d('Creating auth Apollo link');
		const authLink = new ApolloLink((operation, forward) => {
			const token = window.localStorage.getItem(Environment.getString('authAccessTokenKey'));
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
			// WARNING: This fieldname is set in the @imperium/auth-server:src/models/Auth.ts file in the refresh() method.
			accessTokenField: 'access',
			isTokenValidOrUndefined: () => {
				return isTokenValidOrUndefined();
			},
			fetchAccessToken: async () => {
				return fetchAccessToken();
			},
			handleFetch: accessToken => {
				d('Fetched access token');
				window.localStorage.setItem(Environment.getString('authAccessTokenKey'), accessToken);
			},
			handleError: err => {
				d('There was a problem refreshing the access token. Re-login required.');
				window.localStorage.removeItem(Environment.getString('authAccessTokenKey'));
				window.localStorage.removeItem(Environment.getString('authIdKey'));
				if (options?.refreshFailed) {
					options.refreshFailed(err);
				}
			},
		}) as unknown) as ApolloLink;

		// This order matters!
		return [refreshLink, authLink];
	};
}
