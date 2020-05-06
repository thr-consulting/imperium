import {Connector, ConnectorsConfig, ContextManager} from '@imperium/context-manager';

// Connectors are created outside of the domain but the domain needs
// to know the key and type of each connector.

// 1. Define a type of connectors that this domain requires.
type Domain1Connectors = Connector<{
	mongo: ConnectorsConfig<number>;
}>;

// 2. Each domain should export a function that creates a context.
export function createDomain1Context(connectors: Domain1Connectors) {
	// Domain context creator functions can return ANYTHING but usually ContextManager instances.

	// A ContextManager is constructed with:
	//   * An object of creator functions that can return anything. Each creator function
	//     also gets access to the domain's connectors.
	//     These creator functions usually return Model classes and DataLoader instances.
	//   * The connectors passed in from the app server.
	return new ContextManager(
		{
			MyModel1: () => {},
			MyDataLoader1: conn => {},
		},
		connectors,
	);
}

// 3. Each domain should also export the return type of the context creator function.
export type Context = ReturnType<typeof createDomain1Context>;
