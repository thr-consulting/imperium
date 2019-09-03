import {ImperiumServerModule} from '@imperium/core';
import {name} from '../../package.json';
import secureEndpoints from './secureEndpoint';
import insecureEndpoints from './insecureEndpoint';

export default function(): ImperiumServerModule {
	return {
		name,
		options() {
			return {
				secureGraphqlUrl: process.env.GRAPHQL_SECURE_URL,
				insecureGraphqlUrl: process.env.GRAPHQL_INSECURE_URL,
			};
		},
		endpoints(args) {
			secureEndpoints(args);
			insecureEndpoints(args);
		},
	};
}
