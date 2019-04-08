import {EndpointParameters} from '@imperium/core';
import graphql from './graphql';
import graphiql from './graphiql';

export default function endpoints({app, connectors, modules, middleware}: EndpointParameters): void {
	graphql({app, connectors, modules, middleware});
	graphiql({app, modules});
}
