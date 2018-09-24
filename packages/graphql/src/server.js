import endpoints from './server/endpoints';

export default function() {
	return {
		endpoints,
		initialConfig() {
			return {
				graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
			};
		},
	};
}
