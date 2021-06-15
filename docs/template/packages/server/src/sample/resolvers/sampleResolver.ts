import type {IResolvers} from 'graphql-tools';
import type {Context} from '../../../home/mike/dev/khords/packages/server/src/core/createDomain';
import type {Sample} from '../entities';

export function sampleResolver(): IResolvers<Sample, Context> {
	return {
		Query: {
			async getSample(obj, {id}: {id: string}, ctx) {
				const sample = await ctx.sample.getById(id);
				if (!sample) throw new Error('Sample not found');
				return sample;
			},
		},
	};
}
