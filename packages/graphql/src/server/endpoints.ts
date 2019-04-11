import {EndpointOptions} from '@imperium/core';
import graphql from './graphql';
import graphiql from './graphiql';

export default function endpoints({app, connectors, modules, middleware}: EndpointOptions): void {
	graphql({app, connectors, modules, middleware});
	graphiql({app, modules});
}
