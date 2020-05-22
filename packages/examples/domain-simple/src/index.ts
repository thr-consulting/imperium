import {Connector, ConnectorsConfig, ContextManager} from '@imperium/context-manager';

// Connectors are created outside of the domain so the domain exports a type to indicate the required
// shape for connectors.

// Define a type of connectors that this domain requires.
export type DomainSimpleConnectors = Connector<{
	basicConnector: ConnectorsConfig<number>;
}>;

// Each domain should export a function that creates a context.
export function createDomainSimpleContext(connectors: DomainSimpleConnectors) {
	// Domain context creator functions can return ANYTHING but usually ContextManager instances.

	// A ContextManager is constructed with:
	//   * An object of creator functions that can return anything.
	//     These creator functions usually return Model classes and DataLoader instances.
	//   * The connectors passed in from the app server.
	return new ContextManager(
		{
			MyModel1: () => {},
			MyDataLoader1: (/* connectors */) => {},
		},
		connectors,
	);
}

// Each domain should also export the return type of the context creator function.
export type Context = ReturnType<typeof createDomainSimpleContext>;
