import models from './models';
import startup from './startup';
import {schema, resolvers} from './graphql';

export default function() {
	return {
		models,
		startup,
		schema,
		resolvers,
	};
};
