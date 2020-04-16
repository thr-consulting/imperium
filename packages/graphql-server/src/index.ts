import {ImperiumServerModule} from '@imperium/server';
import endpoints from './endpoints';

export default function (): ImperiumServerModule {
	return {
		name: '@imperium/graphql-server',
		environment() {
			return {
				graphqlAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure',
				graphqlUrl: process.env.GRAPHQL_URL || '/api/graphql',
				graphqlCredentialsRequired: process.env.GRAPHQL_CREDENTIALS_REQUIRED === 'true',
				graphqlCorsOrigin: process.env.CORS_ORIGIN?.split(',') || false,
				graphqlWs: process.env.GRAPHQL_ENABLE_SUBSCRIPTIONS === 'true',
			};
		},
		endpoints,
	};
}

export {ImperiumGraphqlServerModule, IResolverObject, IFieldResolver, IResolvers} from './types';
