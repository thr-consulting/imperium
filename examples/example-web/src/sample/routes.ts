import {defineRoutes} from '@imperium/router';
import debug from 'debug';

const d = debug('imperium.example-web.sample.routes');

export const routes = defineRoutes({
	home: {
		path: '/',
		isPublic: true,
	},
});
