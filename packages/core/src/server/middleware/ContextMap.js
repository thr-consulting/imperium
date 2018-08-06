export default class Context {
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
	addModule(moduleFunc) {
		const moduleModels = moduleFunc(this._connectors, this);
		this._models = Object.assign({}, this._models, moduleModels);
	}

	/**
	 * Returns the model with the specified name
	 * @param name
	 * @returns {*}
	 */
	getModel(name) {
		return this._models[name];
	}

	/**
	 * Returns all the models
	 * @returns {*}
	 */
	get models() {
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
	 * Returns the auth data (Immutable Map)
	 * @returns {null|*}
	 */
	get auth() {
		return this._auth;
	}

	get connectors() {
		return this._connectors;
	}
}
