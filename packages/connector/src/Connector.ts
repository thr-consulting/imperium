import debug from 'debug';

const d = debug('imperium.connector.Connectors');

export interface ConnectorsConfig<T = any> {
	connect: () => Promise<T>;
	close?: (connection: T) => Promise<void>;
}

export class Connector<T extends {[key: string]: ConnectorsConfig} = Record<string, ConnectorsConfig>> {
	private readonly connectionConfigs: T;
	private connected = false;
	public readonly connections: {[P in keyof T]: ReturnType<T[P]['connect']> extends Promise<infer C> ? C : ReturnType<T[P]['connect']>};

	constructor(connectorConfigs: T) {
		this.connectionConfigs = connectorConfigs;
		this.connections = {} as this['connections'];
	}

	/**
	 * Returns true if the connectors are connected.
	 */
	public get isConnected(): boolean {
		return this.connected;
	}

	/**
	 * Connect each connector
	 */
	public async connect(): Promise<Connector<T>> {
		if (!this.connected) {
			await Promise.all(
				(Object.keys(this.connectionConfigs) as (keyof T)[]).map(async key => {
					if (typeof this.connectionConfigs[key].connect === 'function') {
						d(`Connecting ${key}`);
						this.connections[key] = await this.connectionConfigs[key].connect();
					}
				}),
			);
			this.connected = true;
			return this;
		}
		throw new Error('Connectors are already connected.');
	}

	/**
	 * Close each connector
	 */
	public async close(): Promise<Connector<T>> {
		if (this.isConnected) {
			await Promise.all(
				(Object.keys(this.connectionConfigs) as (keyof T)[]).map(async key => {
					d(`Closing ${key}`);
					this.connectionConfigs[key].close?.(this.connections[key]);
					delete this.connections[key];
				}),
			);
			this.connected = false;
			return this;
		}
		throw new Error('Connectors are not connected.');
	}
}
