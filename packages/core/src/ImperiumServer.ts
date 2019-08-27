import express from 'express';
import debug from 'debug';

const d = debug('imperium.core.server');

export interface ImperiumConnectors {
	create(): Promise<{[connectorName: string]: any}>,
	close(): Promise<void>,
}

export interface ImperiumServerOptions {
	connectors: ImperiumConnectors,
}

export default class ImperiumServer {
	_connectors: ImperiumConnectors;

	constructor(options: ImperiumServerOptions) {
		this._connectors = options.connectors;
	}

	async start() {
		d('Creating connectors');
		await this._connectors.create();

		d('Starting express app');
		// Create express app
		const app = express();
		app.listen(process.env.PORT || 4001, () => {
			// console.log(`  PID ${process.pid} listening on port ${process.env.PORT || 4000}`);
		});

		return this;
	}

	async stop() {
		d('Closing connectors');
		this._connectors.close();
	}
}
