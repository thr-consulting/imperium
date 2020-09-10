import memoize from 'lodash/memoize';

export const environment = memoize((env: Record<string, unknown>) => ({
	graphqlUri: (env.graphql as string) || 'http://localhost:4001/api/graphql',
	graphqlSubscriptionUri: (env.graphqlws as string) || null, // 'ws://localhost:4001/api/graphql',
}));
