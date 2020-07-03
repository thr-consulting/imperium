import type {AuthenticatedUser, TypeOfPromise} from '@imperium/context-manager';
import {createDomainSimpleContext} from '@imperium/example-domain-simple';
import {createDomainAdvancedContext} from '@imperium/example-domain-advanced';
import type {connectors} from './connectors';

/*
	Domains are collections of models and model specific mechanisms like DataLoader (caching & batching).
	Domains are not related to each other in code and won't know about each other.
	Domains can be anything. Primitives, objects, or complex classes.
	Domains are usually an instance of ContextManager.

	The `contextCreator()` function is used to create an instance of context (state).
	This function is called on every network request (like graphql) or every operation (like startup).

	Authentication data is optional. The Auth class works with ContextManager to keep track of
	authentication state. An Auth instance should be created on every network request or operation.
	Initially the Auth instance has no way of accessing the domain. We must link it with an AuthAccessor
	implementation, which usually is extend in a AuthDomain implementation (AuthModel in this example).
 */

export async function contextCreator(conn: typeof connectors, authenticatedUser?: AuthenticatedUser) {
	return {
		domainSimple: createDomainSimpleContext(conn),
		domainAdvanced: await createDomainAdvancedContext(conn, authenticatedUser),
		domainAnything: {anything: 5},
	};
}

// We also need to export the return type of the context creator function.
// This will be imported by server modules.
export type Context = TypeOfPromise<ReturnType<typeof contextCreator>>;
