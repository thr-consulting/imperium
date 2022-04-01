import {ApolloLink} from '@apollo/client';
import {isTokenValidOrUndefined, fetchAccessToken} from '@imperium/auth-client';
import {env} from '@thx/env';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import debug from 'debug';
import {defaults} from './defaults';
import {authorizationHeader} from '@imperium/authorization';

const d = debug('imperium.auth-graphql-client.apolloLink');

export interface AuthGraphqlClientOptions {
	refreshFailed?: (err: Error) => void;
}

export function createLinks(options?: AuthGraphqlClientOptions) {
	return (): ApolloLink[] => {
		// Create Apollo middleware link (for authorization)
		d('Creating auth Apollo link');
		const authLink = new ApolloLink((operation, forward) => {
			const token = window.localStorage.getItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
			if (token) {
				operation.setContext({
					headers: authorizationHeader(token),
				});
			} else {
				d('Token not set in local storage');
			}
			return forward(operation);
		});

		d('Creating refresh Apollo link');
		const refreshLink = new TokenRefreshLink({
			// WARNING: This fieldname is set in the @imperium/auth-server:src/models/Auth.ts file in the refresh() method.
			accessTokenField: 'access',
			isTokenValidOrUndefined: () => {
				return isTokenValidOrUndefined();
			},
			fetchAccessToken: async () => {
				d('Fetching access token');
				return fetchAccessToken();
			},
			handleFetch: accessToken => {
				d('Fetched access token');
				window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), accessToken);
			},
			handleError: err => {
				d('There was a problem refreshing the access token. Re-login required.');
				window.localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
				window.localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
				if (options?.refreshFailed) {
					options.refreshFailed(err);
				}
			},
		}) as unknown as ApolloLink;

		// This order matters!
		return [refreshLink, authLink];
	};
}
