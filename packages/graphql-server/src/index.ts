import {ImperiumServerModule} from '@imperium/server';
import endpoints from './endpoints';

// import and call environment from './environment' to use env variables
export const graphqlServerModule = {
	name: '@imperium/graphql-server',
	endpoints,
} as ImperiumServerModule<any, any>;

export {ImperiumGraphqlServerModule, IResolverObject, IFieldResolver, IResolvers} from './types';
