import {ApolloLink} from '@apollo/client';

export function removeTypeNameLink() {
	return new ApolloLink((operation, forward) => {
		if (operation.variables) {
			const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);
			// eslint-disable-next-line no-param-reassign
			operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
		}
		return forward(operation).map(data => {
			return data;
		});
	});
}
