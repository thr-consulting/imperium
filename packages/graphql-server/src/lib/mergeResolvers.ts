/* eslint-disable @typescript-eslint/no-explicit-any,no-restricted-syntax */
import type {IResolvers} from 'graphql-tools';
import {mergeDeep} from './mergeDeep';

export type ResolversFactory<TContext> = (...args: any[]) => IResolvers<any, TContext>;
export type ResolversDefinition<TContext> = IResolvers<any, TContext> | ResolversFactory<TContext>;

/**
 * Additional options for merging resolvers
 */
export interface MergeResolversOptions {
	exclusions?: string[];
}

/**
 * Deep merges multiple resolver definition objects into a single definition.
 * @param resolversDefinitions Resolver definitions to be merged
 * @param options Additional options
 *
 * ```js
 * const { mergeResolvers } = require('@graphql-tools/merge');
 * const clientResolver = require('./clientResolver');
 * const productResolver = require('./productResolver');
 *
 * const resolvers = mergeResolvers([
 *  clientResolver,
 *  productResolver,
 * ]);
 * ```
 *
 * If you don't want to manually create the array of resolver objects, you can
 * also use this function along with loadFiles:
 *
 * ```js
 * const path = require('path');
 * const { mergeResolvers } = require('@graphql-tools/merge');
 * const { loadFilesSync } = require('@graphql-tools/load-files');
 *
 * const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
 *
 * const resolvers = mergeResolvers(resolversArray)
 * ```
 */
export function mergeResolvers<TContext, T extends ResolversDefinition<TContext> = ResolversDefinition<TContext>>(
	resolversDefinitions: T[],
	options?: MergeResolversOptions,
): T {
	if (!resolversDefinitions || resolversDefinitions.length === 0) {
		return {} as T;
	}

	if (resolversDefinitions.length === 1) {
		const singleDefinition = resolversDefinitions[0];
		if (Array.isArray(singleDefinition)) {
			return mergeResolvers(singleDefinition);
		}
		return singleDefinition;
	}

	const resolversFactories = new Array<ResolversFactory<TContext>>();
	const resolvers = new Array<IResolvers<any, TContext>>();

	for (let resolversDefinition of resolversDefinitions) {
		if (Array.isArray(resolversDefinition)) {
			resolversDefinition = mergeResolvers(resolversDefinition);
		}
		if (typeof resolversDefinition === 'function') {
			resolversFactories.push(resolversDefinition as ResolversFactory<TContext>);
		} else if (typeof resolversDefinition === 'object') {
			resolvers.push(resolversDefinition as IResolvers<any, TContext>);
		}
	}
	let result: T = {} as T;
	if (resolversFactories.length) {
		result = ((...args: any[]) => {
			const resultsOfFactories = resolversFactories.map(factory => factory(...args));
			return resolvers.concat(resultsOfFactories).reduce(mergeDeep, {});
		}) as any;
	} else {
		result = resolvers.reduce(mergeDeep, {});
	}
	if (options && options.exclusions) {
		for (const exclusion of options.exclusions) {
			const [typeName, fieldName] = exclusion.split('.');
			if (!fieldName || fieldName === '*') {
				// @ts-ignore
				delete result[typeName];
				// @ts-ignore
			} else if (result[typeName]) {
				// @ts-ignore
				delete result[typeName][fieldName];
			}
		}
	}
	return result;
}
