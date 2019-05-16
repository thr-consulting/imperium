import models from './models';
import startup from './startup';
import {schema, resolvers, schemaDirectives} from './graphql';
import endpoints from './endpoints';
import middleware from './middleware';

export default function ImperiumAuthModule() {
	return {
		models,
		startup,
		schema,
		schemaDirectives,
		resolvers,
		endpoints,
		middleware,
		initialConfig() {
			return {
				jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME || 'IMP.jwt',
				rtoken_localstorage_name: process.env.RTOKEN_LOCALSTORAGE_NAME || 'IMP.rtoken',
			};
		},
	};
}
