import type {connectors} from './connectors';
import {createDomain1Context} from './domain1';
import {createDomain3Context} from './domain3';

// Define a context creator function for your domains.
//  You can specify multiple domains but they are isolated from each other.
//  Domains can be ANYTHING but are usually an instance of ContextManager.
//  that are created in the domain library.
export function contextCreator(conn: typeof connectors) {
	return {
		domain1: createDomain1Context(conn),
		domain2: {anything: 5},
		domain3: createDomain3Context(conn),
	};
}

// We also need to export the return type of the context creator function.
// This will be imported by server modules.
export type Context = ReturnType<typeof contextCreator>;
