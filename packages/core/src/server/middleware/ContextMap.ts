import {Connectors, Model, ServerModuleFunc} from '../../../types';

export default class Context {
	_connectors: Connectors[];
	_models: Record<string, Model>;
	_auth: any;

	constructor(connectors) {
		this._connectors = connectors;
		this._models = {};
		this._auth = null;
	}

	/**
	 * Adds a module function to the registry. A module function has the
	 * following signature: (connectors, context) => {} and returns
	 * an object keyed with data model objects.
	 * @param moduleFunc
	 */
	addModule(moduleFunc: ServerModuleFunc): void {
		const moduleModels = moduleFunc(this._connectors, this);
		this._models = Object.assign({}, this._models, moduleModels);
	}

	/**
	 * Returns the model with the specified name
	 * @param name
	 * @returns {*}
	 */
	getModel(name): Model {
		return this._models[name];
	}

	/**
	 * Returns all the models
	 * @returns {*}
	 */
	get models(): Record<string, Model> {
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

	get connectors(): Connectors[] {
		return this._connectors;
	}
}
