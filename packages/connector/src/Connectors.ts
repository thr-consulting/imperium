import type {Connector} from './Connector';

interface NamedConnectors {
	[name: string]: Connector;
}

export class Connectors {
	private readonly connectors: NamedConnectors;

	constructor(connectors: Connector[]) {
		this.connectors = connectors.reduce((memo, connector) => {
			if (memo[connector.name]) {
				throw new Error(`Connector name: ${connector.name} already exists`);
			}
			return {
				...memo,
				[connector.name]: connector,
			};
		}, {} as NamedConnectors);
	}

	public async connect() {
		await Promise.all(
			Object.values(this.connectors).map(async connector => {
				await connector.connect();
				return connector.isReady();
			}),
		);
	}

	public async close() {
		await Promise.all(
			Object.values(this.connectors).map(async connector => {
				if (connector.close) await connector.close();
			}),
		);
	}

	public get(type: string) {
		if (!this.connectors[type]) {
			throw new Error(`Connector: ${type} doesn't exist`);
		}
		return this.connectors[type].get();
	}
}
