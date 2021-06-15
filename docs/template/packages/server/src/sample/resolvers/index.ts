import {mergeResolvers} from '@imperium/graphql-server';
import type {Context} from '../../../home/mike/dev/khords/packages/server/src/core/createDomain';
import {sampleResolver} from './sampleResolver';

export function resolvers() {
	return mergeResolvers<Context>([sampleResolver()]);
}
