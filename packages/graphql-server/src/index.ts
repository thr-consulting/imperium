import {ImperiumServerModule} from '@imperium/server';
import endpoints from './endpoints';

// import and call environment from './environment' to use env variables
export const graphqlServerModule: ImperiumServerModule<any, any> = {
	name: '@imperium/graphql-server',
	endpoints,
};

export {ImperiumGraphqlServerModule, IResolverObject, IFieldResolver, IResolvers} from './types';
