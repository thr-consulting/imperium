import {BatchHttpLink} from '@apollo/client/link/batch-http';
import type {ExcludeFalse} from '@thx/util';
import {onError} from '@apollo/client/link/error';
import debug from 'debug';
import type {ImperiumClient, ImperiumClientModule} from '@imperium/client';
import {Environment} from '@thx/env';
import {ApolloLink, split} from '@apollo/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import type {GraphqlClientOptions} from './withGraphql';
import {isImperiumGraphqlClientModule} from './types';
import {removeTypeNameLink} from './removeTypeNameLink';

const d = debug('imperium.graphql-client.createLink');

export interface ILink {
	link: ApolloLink;
	close: () => void;
}

export function createLink(client: ImperiumClient, opts?: GraphqlClientOptions): ILink {
	const graphqlUri = Environment.getString('graphql');
	const graphqlSubscriptionUri = Environment.getString('graphqlws');

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

	let finalLink: ApolloLink = httpLink;
	let wsLink: WebSocketLink | null = null;
	let subscriptionClient: SubscriptionClient | null = null;

	// Split between normal http and ws for subscriptions
	if (graphqlSubscriptionUri.length > 0) {
		d(`Creating subscription client: ${graphqlSubscriptionUri}`);
		subscriptionClient = new SubscriptionClient(graphqlSubscriptionUri, {
			connectionParams: {thing: 'fdas'},
			reconnect: true,
		});

		d('Creating Apollo websocket link');
		wsLink = new WebSocketLink(subscriptionClient);

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
		[errorLink, !!opts?.removeTypenameOnInput && removeTypeNameLink(), ...moduleLinks, finalLink].filter(Boolean as any as ExcludeFalse),
	);

	return {
		link,
		close: () => {
			if (wsLink && (wsLink as any).close) {
				(wsLink as any).close();
			}
			if (subscriptionClient) {
				subscriptionClient.close(true, true);
			}
		},
	};
}
