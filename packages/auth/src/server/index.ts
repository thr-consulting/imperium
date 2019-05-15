import models from './models';
import startup from './startup';
import {schema, resolvers} from './graphql';
import endpoints from './endpoints';

export default {
	models,
	startup,
	schema,
	resolvers,
	endpoints,
};
