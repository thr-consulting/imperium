import type {ImperiumServerModule} from '@imperium/server';
import './defaults';
import {endpoints} from './endpoints';
import type {GraphqlServerModuleConfig} from './types';

/**
 * The graphql server module needs to be added to Imperium server modules to enable graphql endpoints.
 * @param config
 */
export function graphqlServerModule<T>(config?: GraphqlServerModuleConfig<T>): ImperiumServerModule<any> {
	return {
		name: '@imperium/graphql-server',
		endpoints: endpoints<T>(config),
	};
}

export {mergeResolvers} from './lib/mergeResolvers';
export type {ResolversDefinition, ResolversFactory, MergeResolversOptions} from './lib/mergeResolvers';
export type {ImperiumGraphqlServerModule, GraphqlServerModuleConfig} from './types';
