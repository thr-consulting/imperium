import {
	ApolloClient,
	ApolloClientOptions,
	ApolloProvider,
	InMemoryCache,
	MutationOptions,
	NormalizedCacheObject,
	QueryOptions,
	WatchQueryOptions,
} from '@apollo/client';
import type {Hoc, ImperiumClient} from '@imperium/client';
import {Environment} from '@thx/env';
import debug from 'debug';
import mergeOptions from 'merge-options';
import React, {useState} from 'react';
import {createLink, ILink} from './createLink';
import {ImperiumGraphqlContext} from './ImperiumGraphqlContext';

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

function getClient(client: ImperiumClient, opts?: GraphqlClientOptions, oldClient?: ApolloClient<any>, oldLink?: ILink | null) {
	if (oldClient) {
		d('Stopping old Apollo client');
		oldClient.clearStore().then(() => {
			oldClient.stop();
			if (oldLink) {
				oldLink.close();
			}
		});
	}

	d('Creating Apollo client');
	const apolloDefaults = Environment.getRecord('apolloDefaults') as unknown as ApolloDefaults;
	const link = createLink(client, opts);
	const apolloClientOptions = mergeOptions(
		{
			link: link.link,
			cache: new InMemoryCache(),
			defaultOptions: apolloDefaults,
		},
		opts?.apolloClientOptions,
	);

	// Configure Apollo GraphQL client
	return {
		client: new ApolloClient(apolloClientOptions),
		link,
	};
}

export function withGraphql(opts?: GraphqlClientOptions) {
	return (client: ImperiumClient): Hoc => {
		d('Creating initial Apollo client');
		const {client: initialClient} = getClient(client, opts);

		return function graphqlHoc(WrappedComponent: React.ComponentType) {
			const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

			function ComponentWithGraphql(props: any) {
				const [apolloClient, setApolloClient] = useState<ApolloClient<any>>(initialClient);
				const [link, setLink] = useState<ILink | null>();

				return (
					<ImperiumGraphqlContext.Provider
						value={{
							reconnect() {
								const {client: newClient, link: newLink} = getClient(client, opts, apolloClient, link);
								setApolloClient(newClient);
								setLink(newLink);
							},
						}}
					>
						<ApolloProvider client={apolloClient}>
							<WrappedComponent {...props} />
						</ApolloProvider>
					</ImperiumGraphqlContext.Provider>
				);
			}

			ComponentWithGraphql.displayName = `withGraphql(${displayName})`;

			return ComponentWithGraphql;
		};
	};
}
