import {AuthenticatedUser} from '@imperium/connector';
import type {TypeOfPromise} from '@imperium/util';
import {createDomain} from '@imperium/example-domain';
import type {connectors} from './connectors';

/*
	Domains are collections of models and model specific mechanisms like DataLoader (caching & batching).
	Domains are not related to each other in code and won't know about each other.
	Domains can actually be anything. Primitives, objects, or complex classes.
	Domains are usually an instance of ContextManager.

	The `contextCreator()` function is used to create an instance of context (state).
	This function is usually called on every network request or every operation.
 */

export async function contextCreator(conn: typeof connectors, auth?: AuthenticatedUser) {
	return createDomain(conn, auth);
}

// We also need to export the return type of the context creator function.
// This will be imported by server modules.
export type Context = TypeOfPromise<ReturnType<typeof contextCreator>>;
