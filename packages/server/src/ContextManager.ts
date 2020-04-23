import {Connector} from './Connector';

export interface ContextCreators<C extends Connector> {
	[key: string]: (conn: C) => any;
}

export class ContextManager<T extends ContextCreators<C>, C extends Connector = Connector> {
	public readonly context = {} as {[P in keyof T]: ReturnType<T[P]>};

	constructor(context: T, connectors: C) {
		// ContextManager is meant to be created frequently, so the connectors should be connected already.
		if (!connectors.isConnected) {
			connectors.connect();
		}
		(Object.keys(context) as (keyof T)[]).forEach(key => {
			// creating the contexts
			if (typeof context[key] === 'function') {
				this.context[key] = context[key](connectors);
			}
		});
	}
}
