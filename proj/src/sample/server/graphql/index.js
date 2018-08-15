import property from 'lodash/property';
import Sample from './Sample.graphqls';

export const schema = [Sample];

export const resolvers = {
	Sample: {
		id: property('_id'),
	},
	Query: {
		getSample: (obj, args, ctx) => ctx.models.Sample.getOne(),
	}
};
