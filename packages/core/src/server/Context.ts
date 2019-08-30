import {ImperiumConnectors, Models} from '../serverTypes';

export default class Context {
	_connectors: ImperiumConnectors;
	_models: {[key: string]: any};
	_auth: any;

	constructor(connectors: ImperiumConnectors) {
		this._connectors = connectors;
		this._models = {};
		this._auth = null;
	}

	/**
	 * Adds a module function to the registry. A module function has the
	 * following signature: (connectors, context) => {} and returns
	 * an object keyed with data model objects.
	 * @param modelFunc
	 */
	addModels(
		modelFunc: (connectors: ImperiumConnectors, context: Context) => Models,
	): void {
		const moduleModels = modelFunc(this._connectors, this);
		this._models = Object.assign({}, this._models, moduleModels);
	}

	/**
	 * Returns the model with the specified name
	 * @param name
	 * @returns {*}
	 */
	getModel(name: string): any {
		return this._models[name];
	}

	/**
	 * Returns all the models
	 * @returns {*}
	 */
	get models(): {[modelName: string]: any} {
		return this._models;
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

	get connectors(): ImperiumConnectors {
		return this._connectors;
	}
}
