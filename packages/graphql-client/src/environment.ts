import memoize from 'lodash/memoize';
import type {MutationOptions, QueryOptions, WatchQueryOptions} from '@apollo/client';

interface ApolloDefaults {
	query: Pick<QueryOptions, 'fetchPolicy' | 'errorPolicy'>;
	watchQuery: Pick<
		WatchQueryOptions,
		'errorPolicy' | 'fetchPolicy' | 'nextFetchPolicy' | 'notifyOnNetworkStatusChange' | 'partialRefetch' | 'pollInterval' | 'returnPartialData'
	>;
	mutate: Pick<MutationOptions, 'awaitRefetchQueries' | 'errorPolicy' | 'fetchPolicy'>;
}

export const environment = memoize((env: Record<string, unknown>) => ({
	graphqlUri: (env.graphql as string) || 'http://localhost:4001/api/graphql',
	graphqlSubscriptionUri: (env.graphqlws as string) || null, // 'ws://localhost:4001/api/graphql',
	apolloDefaults: (env.apolloDefaults as ApolloDefaults | undefined) || undefined,
}));
