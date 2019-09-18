import debug from 'debug';
import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {ApolloLink, split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import {ImperiumClient} from '@imperium/core';

const d = debug('imperium.graphql.withGraphql');

export default function withGraphql(client: ImperiumClient) {
	d('Creating Apollo client');

	d('Creating Apollo HTTP link');
	const httpLink = new HttpLink({
		uri: client.initialConf.graphql,
		credentials: 'same-origin',
	});

	d('Creating Apollo Error link');
	const errorLink = onError(({graphQLErrors, networkError}) => {
		if (graphQLErrors)
			graphQLErrors.forEach(({message, locations, path}) =>
				d(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
			);
		if (networkError) d(`[Network error]: ${networkError}`);
	});

	// Assume normal http link as the final link
	let finalLink: ApolloLink = httpLink;

	// Split between normal http and ws for subscriptions
	if (client.initialConf.graphqlws) {
		d('Creating Apollo websocket link');
		const wsLink = new WebSocketLink({
			uri: client.initialConf.graphqlws,
			options: {
				reconnect: true,
			},
		});

		d('Splitting link between regular http and websocket.');
		finalLink = split(
			({query}) => {
				const definition = getMainDefinition(query);
				return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
			},
			wsLink,
			httpLink,
		);
	}

	// Create complete link object
	const link = ApolloLink.from([errorLink, ...(client.initialState.apolloLinks || []), finalLink]);

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
