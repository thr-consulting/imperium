interface ConnectorsConfig {
	connect: () => any;
	close: () => void;
}

export class Connector<T extends {[key: string]: ConnectorsConfig} = {}> {
	private readonly connectionConfigs: T;
	private connected = false;
	public readonly connections: {[P in keyof T]: ReturnType<T[P]['connect']>};

	constructor(connectorConfigs: T) {
		this.connectionConfigs = connectorConfigs;
		this.connections = {} as {[P in keyof T]: ReturnType<T[P]['connect']>};
	}

	public get isConnected() {
		return this.connected;
	}

	public connect() {
		if (!this.connected) {
			(Object.keys(this.connectionConfigs) as (keyof T)[]).forEach(key => {
				if (typeof this.connectionConfigs[key].connect === 'function') {
					this.connections[key] = this.connectionConfigs[key].connect();
				}
			});
			this.connected = true;
			return this;
		}
		throw new Error('Connectors are already connected.');
	}

	public close() {
		if (this.isConnected) {
			(Object.keys(this.connectionConfigs) as (keyof T)[]).forEach(key => {
				if (typeof this.connectionConfigs[key].close === 'function') {
					delete this.connections[key];
				}
			});
			this.connected = false;
			return this;
		}
		throw new Error('Connectors are not connected.');
	}
}
