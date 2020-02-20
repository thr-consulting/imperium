import {ContextMap, ContextMapFunc, IContextManager, IImperiumServer, Context} from './types';

export class ContextManager implements IContextManager {
	[prop: string]: Context;
	readonly _server: IImperiumServer;
	private _context: ContextMap;
	private _auth: any;

	constructor(server: IImperiumServer) {
		this._server = server;
		this._context = {};
		this._auth = null;
	}

	/**
	 * Adds a module function to the registry. A module function has the
	 * following signature: (connectors, context) => {} and returns
	 * an object keyed with data model objects.
	 * @param contextFunc
	 */
	addContext(contextFunc: ContextMapFunc): void {
		const context = contextFunc(this._server, this);
		const keys = Object.keys(context);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (this[key] === undefined) {
				this[key] = context[key];
			}
		}
	}

	/**
	 * Returns the model with the specified name
	 * @param name
	 * @returns {*}
	 */
	getContext(name: string): Context {
		return this._context[name];
	}

	/**
	 * Returns all the models
	 * @returns {*}
	 */
	get context(): ContextMap {
		return this._context;
	}

	/**
	 * Sets new auth data
	 * @param value
	 */
	set auth(value) {
		this._auth = value;
	}

	/**
	 * Returns the auth data
	 * @returns {null|*}
	 */
	get auth(): any {
		return this._auth;
	}

	get server(): IImperiumServer {
		return this._server;
	}
}
