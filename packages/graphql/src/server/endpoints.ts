import {EndpointParameters} from '@imperium/core/types.d';
import graphql from './graphql';
import graphiql from './graphiql';

export default function endpoints({app, connectors, modules, middleware}: EndpointParameters) {
	graphql({app, connectors, modules, middleware});
	graphiql({app});
}
