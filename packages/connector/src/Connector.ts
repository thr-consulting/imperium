import type {Connectors} from './Connectors';

interface ConnectorConfig<T> {
	connect: (connectors: Connectors) => Promise<T>;
	close?: (instance: T) => Promise<void>;
	isReady?: (instance: T) => Promise<boolean>;
}

export class Connector<T = unknown> {
	public readonly name: string;
	readonly #connect: ConnectorConfig<T>['connect'];
	readonly #close?: ConnectorConfig<T>['close'];
	readonly #isReady?: ConnectorConfig<T>['isReady'];
	#instance?: T;

	constructor(name: string, config: ConnectorConfig<T>) {
		this.name = name;
		this.#connect = config.connect;
		this.#close = config.close;
		this.#isReady = config.isReady;
	}

	public get() {
		if (!this.#instance) throw new Error(`Can't get connector: ${this.name}`);
		return this.#instance;
	}

	async connect(connectors: Connectors) {
		this.#instance = await this.#connect(connectors);
	}

	async close() {
		if (this.#close && this.#instance) await this.#close(this.#instance);
	}

	async isReady() {
		if (!this.#instance) return false;
		if (!this.#isReady) return true;
		return this.#isReady(this.#instance);
	}
}
