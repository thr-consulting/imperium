import {Connector} from '@imperium/context-manager';
import debug from 'debug';

const d = debug('imperium.example-server2.connectors');

// Create connectors instance
// Each key requires fields of connect and close
export const connectors = new Connector({
	mongo: {
		async connect() {
			return 5;
		},
		async close() {
			d('Closing mongo connector');
		},
	},
});
