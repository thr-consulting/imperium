import {sequential} from '@thx/promise-sequential';
import type {Connector} from './Connector';

interface NamedConnectors {
	[name: string]: Connector;
}

type CreateConnectors = () => Promise<Connector[]>;

export class Connectors {
	private connectors: NamedConnectors;

	private readonly createConnectors: CreateConnectors;

	constructor(createConnectors: CreateConnectors) {
		this.connectors = {};
		this.createConnectors = createConnectors;
	}

	public async connect() {
		const connectors = await this.createConnectors();
		this.connectors = connectors.reduce((memo, connector) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (memo[connector.name]) {
				throw new Error(`Connector name: ${connector.name} already exists`);
			}
			return {
				...memo,
				[connector.name]: connector,
			};
		}, {} as NamedConnectors);

		await sequential(
			Object.values(this.connectors).map(connector => {
				return async () => {
					await connector.connect(this);
					return connector.isReady();
				};
			}),
		);
	}

	public async close() {
		await Promise.all(
			Object.values(this.connectors).map(async connector => {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (connector.close) await connector.close();
			}),
		);
	}

	public get(type: string) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!this.connectors[type]) {
			throw new Error(`Connector: ${type} doesn't exist`);
		}
		return this.connectors[type].get();
	}
}
