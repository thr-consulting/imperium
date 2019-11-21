import debug from 'debug';
import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {ApolloLink, split} from 'apollo-link';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {WebSocketLink} from 'apollo-link-ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import {Hoc, IImperiumClient, ImperiumClientModule} from '@imperium/client';
import {toString} from '@imperium/util';
import {ImperiumGraphqlClientModule} from './types';

const d = debug('imperium.graphql.withGraphql');

export default function withGraphql(client: IImperiumClient): Hoc {
	d('Creating Apollo client');

	d(`Creating Apollo HTTP link: ${client.globalConst.graphql}`);
	const httpLink = new HttpLink({
		uri: toString(client.globalConst.graphql),
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
	if (client.globalConst.graphqlws) {
		d(`Creating subscription client: ${client.globalConst.graphqlws}`);
		const subscriptionClient = new SubscriptionClient(toString(client.globalConst.graphqlws), {
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
	const moduleLinks = client.modules.reduce((memo, module: ImperiumClientModule & ImperiumGraphqlClientModule) => {
		if (module.apolloLinks) {
			return [...memo, ...module.apolloLinks];
		}
		return memo;
	}, [] as ApolloLink[]);

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
