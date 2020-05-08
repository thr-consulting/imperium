import type {Connector} from './Connector';

interface ContextCreators<C extends Connector> {
	[key: string]: (conn: C) => any;
}

export interface AuthContext {
	id: null | number | string;
	permissions: null | string[];
	hasPermission(need: string[]): boolean;
	getCache(key: string): Promise<any>;
	setCache(key: string, allowed: boolean, expire?: number): Promise<boolean>;
	invalidateCache(key: string): Promise<void>;
}

export class ContextManager<T extends ContextCreators<C>, C extends Connector = Connector> {
	public readonly context = {} as {[P in keyof T]: ReturnType<T[P]>};

	public readonly auth = {} as {id: string};

	constructor(context: T, connectors: C) {
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
	}
}
