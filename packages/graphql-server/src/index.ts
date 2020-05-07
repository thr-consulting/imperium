import type {ImperiumServerModule} from '@imperium/server';
import {endpoints} from './endpoints';
import type {GraphqlServerModuleConfig} from './types';

export function graphqlServerModule(config?: GraphqlServerModuleConfig): ImperiumServerModule<any, any> {
	return {
		name: '@imperium/graphql-server',
		endpoints: endpoints(config),
	};
}

export {ApolloContext, ImperiumGraphqlServerModule, IResolverObject, IFieldResolver, IResolvers, GraphqlServerModuleConfig} from './types';
