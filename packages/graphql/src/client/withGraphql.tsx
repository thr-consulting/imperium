import debug from 'debug';
import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ImperiumClient} from '@imperium/core';

const d = debug('imperium.graphql.withGraphql');

export default function withGraphql(client: ImperiumClient) {
	d('Creating Apollo client');

	// Create Apollo HTTP link
	const httpLink = new HttpLink({
		uri: client.initialConf.graphql,
		credentials: 'same-origin',
	});

	const errorLink = onError(({graphQLErrors, networkError}) => {
		if (graphQLErrors)
			graphQLErrors.forEach(({message, locations, path}) =>
				d(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
			);
		if (networkError) d(`[Network error]: ${networkError}`);
	});

	const link = ApolloLink.from([errorLink, ...(client.initialState.apolloLinks || []), httpLink]);

	// Configure Apollo GraphQL client
	const apolloClient = new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});

	return (WrappedComponent: () => JSX.Element) => {
		return function includeGraphql(props: any): JSX.Element {
			return (
				<ApolloProvider client={apolloClient}>
					<WrappedComponent {...props} />
				</ApolloProvider>
			);
		};
	};
}
