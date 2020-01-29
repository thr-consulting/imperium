import {ImperiumServerModule} from '@imperium/server';
import endpoints from './endpoints';

export default function(): ImperiumServerModule {
	return {
		name: '@imperium/graphql-server',
		environment() {
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

export {ImperiumGraphqlServerModule, IResolverObject, IFieldResolver, IResolvers} from './types';
