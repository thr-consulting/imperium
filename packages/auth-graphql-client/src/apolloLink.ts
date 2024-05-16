import {ApolloLink} from '@apollo/client';
import {authorizationHeader, fetchAccessToken, isTokenValidOrUndefined} from '@imperium/auth-client';
import {env} from '@thx/env';
import {TokenRefreshLink} from 'apollo-link-token-refresh';
import debug from 'debug';
import type {AuthGraphqlBacking} from './AuthGraphqlBacking';
import {defaults} from './defaults';

const d = debug('imperium.auth-graphql-client.apolloLink');

export interface AuthGraphqlClientOptions {
	refreshFailed?: (err: Error) => void;
}

export function createLinks(backing: AuthGraphqlBacking, options?: AuthGraphqlClientOptions) {
	return (): ApolloLink[] => {
		// Create Apollo middleware link (for authorization)
		d('Creating auth Apollo link');
		const authLink = new ApolloLink((operation, forward) => {
			d('Adding authentication for graphql request');
			const token = backing.getToken();
			if (token) {
				operation.setContext({
					headers: authorizationHeader(token),
				});
			} else {
				d('Token not set');
			}
			return forward(operation);
		});

		d('Creating refresh Apollo link');
		const refreshLink = new TokenRefreshLink({
			// WARNING: This fieldname is set in the @imperium/auth-server:src/models/Auth.ts file in the refresh() method.
			accessTokenField: 'access',
			isTokenValidOrUndefined: async () => {
				// TODO Theoretically we can get the token from redux here?
				// const ctx = operation.getContext();
				return isTokenValidOrUndefined(backing.getToken());
			},
			fetchAccessToken: async () => fetchAccessToken(),
			handleFetch: accessToken => {
				d('Successfully renewed access token');
				window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), accessToken);
				// TODO Theoretically we can dispatch the token to redux here
				backing.publishToken(accessToken);
			},
			handleError: err => {
				d(`Error refreshing access token from graphql: ${err.toString()}`);
				window.localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
				window.localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
				// TODO Theoretically we can dispatch the token to redux here
				backing.publishToken(null);
				if (options?.refreshFailed) {
					options.refreshFailed(err);
				}
			},
		}) as unknown as ApolloLink;

		// This order matters!
		return [refreshLink, authLink];
	};
}
