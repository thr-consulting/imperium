import {ImperiumServerModule} from '@imperium/core';
import {name} from '../../package.json';
import endpoints from './endpoints';

export default function(): ImperiumServerModule {
	return {
		name,
		options() {
			return {
				graphqlUrl: process.env.GRAPHQL_URL,
			};
		},
		endpoints,
	};
}
