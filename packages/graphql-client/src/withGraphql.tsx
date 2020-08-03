import debug from 'debug';
import React from 'react';
import {ApolloProvider, ApolloClient, ApolloLink, split, HttpLink, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getMainDefinition} from '@apollo/client/utilities';
import type {Hoc, IImperiumClient, ImperiumClientModule} from '@imperium/client';
import type {ImperiumGraphqlClientModule} from './types';

/**
 * @ignore
 */
const d = debug('imperium.graphql.withGraphql');

export default function withGraphql(client: IImperiumClient): Hoc {
	d('Creating Apollo client');

	d(`Creating Apollo HTTP link: ${client.globalConst.graphql}`);
	const httpLink = new HttpLink({
		uri: client.globalConst.graphql as string,
		credentials: 'same-origin',
	});

	d('Creating Apollo Error link');
	const errorLink = onError(({graphQLErrors, networkError}) => {
		if (graphQLErrors)
			graphQLErrors.forEach(({message, locations, path}) => d(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
		if (networkError) d(`[Network error]: ${networkError}`);
	});

	// Assume normal http link as the final link
	let finalLink: ApolloLink = httpLink;

	// Split between normal http and ws for subscriptions
	if (client.globalConst.graphqlws) {
		d(`Creating subscription client: ${client.globalConst.graphqlws}`);
		const subscriptionClient = new SubscriptionClient(client.globalConst.graphqlws as string, {
			reconnect: true,
		});

		d('Creating Apollo websocket link');
		const wsLink = new WebSocketLink(subscriptionClient);

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

	// Use links from other modules
	const moduleLinks = client.modules.reduce((memo: ApolloLink[], module: ImperiumClientModule & ImperiumGraphqlClientModule) => {
		if (module.apolloLinks && typeof module.apolloLinks === 'function') {
			return [...memo, ...module.apolloLinks(client)];
		}
		return memo;
	}, []);

	// Create complete link object
	const link = ApolloLink.from([errorLink, ...moduleLinks, finalLink]);

	// Configure Apollo GraphQL client
	const apolloClient = new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});

	return function graphqlHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithGraphql(props: any) {
			return (
				<ApolloProvider client={apolloClient}>
					<WrappedComponent {...props} />
				</ApolloProvider>
			);
		}

		ComponentWithGraphql.displayName = `withGraphql(${displayName})`;

		return ComponentWithGraphql;
	};
}
