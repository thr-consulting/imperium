import type {Connector} from './Connector';
import type {AuthenticatedUser} from './types';

interface ContextCreators<C extends Connector> {
	[key: string]: (conn: C) => any;
}

export class ContextManager<T extends ContextCreators<C>, C extends Connector> {
	public readonly authenticatedUser?: AuthenticatedUser;
	public readonly context = {} as {[P in keyof T]: ReturnType<T[P]>};
	public readonly connectors: C;

	constructor(context: T, connectors: C, authenticatedUser?: AuthenticatedUser) {
		// ContextManager is meant to be created frequently, so the connectors should be connected already.
		if (!connectors.isConnected) {
			throw new Error('Connectors must be connected before creating ContextManager');
		}
		(Object.keys(context) as (keyof T)[]).forEach(key => {
			// creating the contexts
			if (typeof context[key] === 'function') {
				this.context[key] = context[key](connectors);
			}
		});

		this.authenticatedUser = authenticatedUser;
		this.connectors = connectors;
	}
}
