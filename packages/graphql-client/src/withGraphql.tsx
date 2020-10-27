import debug from 'debug';
import React from 'react';
import {ApolloProvider, ApolloClient, ApolloLink, split, HttpLink, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getMainDefinition} from '@apollo/client/utilities';
import type {Hoc, ImperiumClient, ImperiumClientModule} from '@imperium/client';
import type {ExcludeFalse} from '@thx/util';
import {environment} from './environment';
import {isImperiumGraphqlClientModule} from './types';
import {removeTypeNameLink} from './removeTypeNameLink';

const d = debug('imperium.graphql.withGraphql');

export interface GraphqlClientOptions {
	removeTypenameOnInput: boolean;
}

export function withGraphql(opts?: GraphqlClientOptions) {
	return (client: ImperiumClient): Hoc => {
		d('Creating Apollo client');

		const env = environment(client.environment);

		d(`Creating Apollo HTTP link: ${env.graphqlUri}`);
		const httpLink = new HttpLink({
			uri: env.graphqlUri as string,
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
		if (env.graphqlSubscriptionUri) {
			d(`Creating subscription client: ${env.graphqlSubscriptionUri}`);
			const subscriptionClient = new SubscriptionClient(env.graphqlSubscriptionUri, {
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
		const moduleLinks = client.modules.reduce((memo: ApolloLink[], module: ImperiumClientModule) => {
			if (isImperiumGraphqlClientModule(module) && module.apolloLinks && typeof module.apolloLinks === 'function') {
				return [...memo, ...module.apolloLinks(client)];
			}
			return memo;
		}, []);

		// Create complete link object (errorLink is first, final link is last)
		const link = ApolloLink.from(
			[errorLink, !!opts?.removeTypenameOnInput && removeTypeNameLink(), ...moduleLinks, finalLink].filter((Boolean as any) as ExcludeFalse),
		);

		// Configure Apollo GraphQL client
		const apolloClient = new ApolloClient({
			link,
			cache: new InMemoryCache(),
			defaultOptions: env.apolloDefaults,
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
	};
}
