import {ImperiumServerModule} from '@imperium/server';
import {name} from '../package.json';
import endpoints from './endpoints';

export default function(): ImperiumServerModule {
	return {
		name,
		options() {
			return {
				graphqlAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure',
				graphqlUrl: process.env.GRAPHQL_URL || '/api/graphql',
				graphqlCredentialsRequired: process.env.GRAPHQL_CREDENTIALS_REQUIRED === 'true',
				graphqlCors: {
					origin: process.env.GRAPHQL_CORS_ORIGIN || false,
				},
				graphqlWs: process.env.GRAPHQL_WS === 'true',
			};
		},
		endpoints,
	};
}
