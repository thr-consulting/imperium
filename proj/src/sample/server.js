import models from './server/models';
import {schema, resolvers} from './server/graphql';

async function startup(ctx) {
	console.log('Sample server startup');
}

export default function() {
	return {
		models,
		startup,
		schema,
		resolvers,
	};
}
