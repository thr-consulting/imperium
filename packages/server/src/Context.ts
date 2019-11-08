import {ImperiumConnectorsMap, ModelsMap, ImperiumOptions, ModelsOptions, IModel} from '../types';

export default class Context {
	_connectors: ImperiumConnectorsMap;
	_models: {[key: string]: any};
	_auth: any;
	_options: ImperiumOptions;

	constructor(connectors: ImperiumConnectorsMap, options: ImperiumOptions) {
		this._connectors = connectors;
		this._models = {};
		this._auth = null;
		this._options = options;
	}

	/**
	 * Adds a module function to the registry. A module function has the
	 * following signature: (connectors, context) => {} and returns
	 * an object keyed with data model objects.
	 * @param modelFunc
	 */
	addModels(modelFunc: ({connectors, context, options}: ModelsOptions) => ModelsMap): void {
		const moduleModels = modelFunc({
			options: this._options,
			connectors: this._connectors,
			context: this,
		});
		this._models = {...this._models, ...moduleModels};
	}

	/**
	 * Returns the model with the specified name
	 * @param name
	 * @returns {*}
	 */
	getModel(name: string): IModel {
		return this._models[name];
	}

	/**
	 * Returns all the models
	 * @returns {*}
	 */
	get models(): ModelsMap {
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

	get connectors(): ImperiumConnectorsMap {
		return this._connectors;
	}

	get options(): ImperiumOptions {
		return this._options;
	}
}
