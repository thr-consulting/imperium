import {ApolloClient, InMemoryCache, MutationOptions, QueryOptions, WatchQueryOptions} from '@apollo/client';
import type {ImperiumClient} from '@imperium/client';
import {env} from '@thx/env';
import debug from 'debug';
import mergeOptions from 'merge-options';
import {createLink, ILink} from './createLink';
import {defaults} from './defaults';
import type {GraphqlClientOptions} from './withGraphql';

const d = debug('imperium.graphql-client.createApolloClient');

interface ApolloDefaults {
	query: Pick<QueryOptions, 'fetchPolicy' | 'errorPolicy'>;
	watchQuery: Pick<
		WatchQueryOptions,
		'errorPolicy' | 'fetchPolicy' | 'nextFetchPolicy' | 'notifyOnNetworkStatusChange' | 'partialRefetch' | 'pollInterval' | 'returnPartialData'
	>;
	mutate: Pick<MutationOptions, 'awaitRefetchQueries' | 'errorPolicy' | 'fetchPolicy'>;
}

export interface ImpApolloClient {
	client: ApolloClient<any>;
	link?: ILink;
}

interface CreateClientOpts {
	client: ImperiumClient;
	opts?: GraphqlClientOptions;
	apolloClient?: ImpApolloClient;
}

export function createApolloClient({client, opts, apolloClient}: CreateClientOpts) {
	if (apolloClient) {
		d('Stopping old Apollo client');
		apolloClient.client.clearStore().then(() => {
			apolloClient.client.stop();
			if (apolloClient.link) {
				apolloClient.link.close();
			}
		});
	}

	const apolloDefaults = env.getJson('apolloDefaults', defaults.apolloDefaults) as unknown as ApolloDefaults;
	const link = createLink(client, opts);
	const apolloClientOptions = mergeOptions(
		{
			link: link.link,
			cache: new InMemoryCache(),
			defaultOptions: apolloDefaults,
		},
		opts?.apolloClientOptions,
	);

	d('Creating Apollo client');
	// Configure Apollo GraphQL client
	return {
		client: new ApolloClient(apolloClientOptions),
		link,
	};
}
