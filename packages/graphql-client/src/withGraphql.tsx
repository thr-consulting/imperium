import {
	ApolloProvider,
	ApolloClient,
	ApolloLink,
	split,
	InMemoryCache,
	ApolloClientOptions,
	NormalizedCacheObject,
	QueryOptions,
	WatchQueryOptions,
	MutationOptions,
} from '@apollo/client';
import {BatchHttpLink} from '@apollo/client/link/batch-http';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import type {Hoc, ImperiumClient, ImperiumClientModule} from '@imperium/client';
import {Environment} from '@thx/env';
import type {ExcludeFalse} from '@thx/util';
import debug from 'debug';
import mergeOptions from 'merge-options';
import React from 'react';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {removeTypeNameLink} from './removeTypeNameLink';
import {isImperiumGraphqlClientModule} from './types';

const d = debug('imperium.graphql-client.withGraphql');

export interface GraphqlClientOptions<TCacheShape = NormalizedCacheObject> {
	removeTypenameOnInput?: boolean;
	apolloClientOptions: Partial<ApolloClientOptions<TCacheShape>>;
	batchMax?: number;
	batchInterval?: number;
}

interface ApolloDefaults {
	query: Pick<QueryOptions, 'fetchPolicy' | 'errorPolicy'>;
	watchQuery: Pick<
		WatchQueryOptions,
		'errorPolicy' | 'fetchPolicy' | 'nextFetchPolicy' | 'notifyOnNetworkStatusChange' | 'partialRefetch' | 'pollInterval' | 'returnPartialData'
	>;
	mutate: Pick<MutationOptions, 'awaitRefetchQueries' | 'errorPolicy' | 'fetchPolicy'>;
}

export function withGraphql(opts?: GraphqlClientOptions) {
	return (client: ImperiumClient): Hoc => {
		d('Creating Apollo client');

		const graphqlUri = Environment.getString('graphql');
		const graphqlSubscriptionUri = Environment.getString('graphqlws');
		const apolloDefaults = (Environment.getRecord('apolloDefaults') as unknown) as ApolloDefaults;

		d(`Creating Apollo HTTP link: ${graphqlUri}`);
		const httpLink = new BatchHttpLink({
			uri: graphqlUri as string,
			credentials: 'same-origin',
			batchInterval: opts?.batchInterval,
			batchMax: opts?.batchMax,
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
		if (graphqlSubscriptionUri.length > 0) {
			d(`Creating subscription client: ${graphqlSubscriptionUri}`);
			const subscriptionClient = new SubscriptionClient(graphqlSubscriptionUri, {
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

		const apolloClientOptions = mergeOptions(
			{
				link,
				cache: new InMemoryCache(),
				defaultOptions: apolloDefaults,
			},
			opts?.apolloClientOptions,
		);

		// Configure Apollo GraphQL client
		const apolloClient = new ApolloClient(apolloClientOptions);

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
