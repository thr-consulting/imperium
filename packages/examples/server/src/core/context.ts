import {createDomain1Context} from '../domain1';
import {createDomain3Context} from '../domain3';
import type {connectors} from './connectors';

/*
	Domains are collections of models and model specific mechanisms like DataLoader (caching & batching).
	Domains are not related to each other in code and won't know about each other.
	Domains can actually be anything. Primitives, objects, or complex classes.
	Domains are usually an instance of ContextManager.

	The `contextCreator()` function is used to create an instance of context (state).
	This function is usually called on every network request or every operation.
 */

export function contextCreator(conn: typeof connectors, auth) {
	return {
		domain1: createDomain1Context(conn),
		domain2: {anything: 5},
		domain3: createDomain3Context(conn, auth),
	};
}

// We also need to export the return type of the context creator function.
// This will be imported by server modules.
export type Context = ReturnType<typeof contextCreator>;
