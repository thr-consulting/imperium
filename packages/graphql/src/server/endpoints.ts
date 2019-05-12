import {EndpointOptions} from '@imperium/core';
import graphql from './graphql';

export default function endpoints({app, connectors, modules, middleware}: EndpointOptions): void {
	graphql({app, connectors, modules, middleware});
}
