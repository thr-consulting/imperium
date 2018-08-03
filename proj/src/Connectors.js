import debug from 'debug';

const d = debug('imperium.connectors');

export default class Connectors {
	async create() {
		d('creating connectors');
		return {
			myConnector: {stuff: 'stuff'},
		};
	}

	async close() {

	}
}
