import express from 'express';
import debug from 'debug';

const d = debug('imperium.core.server');

export default class ImperiumServer {
	start() {
		d('Starting express app');
		// Create express app
		const app = express();
		app.listen(process.env.PORT || 4001, () => {
			// console.log(`  PID ${process.pid} listening on port ${process.env.PORT || 4000}`);
		});
	}
}
