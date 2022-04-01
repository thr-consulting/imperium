export const defaults = {
	apolloDefaults: {
		query: {
			fetchPolicy: 'cache-first',
			errorPolicy: 'all',
		},
		watchQuery: {
			fetchPolicy: 'cache-and-network',
			errorPolicy: 'ignore',
		},
		mutate: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
	IMP_API_URL: 'http://localhost:4001',
	graphql: '/api/graphql',
	graphqlws: '', // ws://localhost:4001/api/graphql',
};
