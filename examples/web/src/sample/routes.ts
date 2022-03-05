import {defineRoutes} from '@imperium/router';
import debug from 'debug';

const d = debug('imperium.examples.web.sample.routes');

export const routes = defineRoutes({
	home: {
		path: '/',
	},
});
