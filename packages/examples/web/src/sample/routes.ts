import debug from 'debug';
import {defineRoutes} from '@imperium/router';

const d = debug('imperium.example.web.sample.routes');

export const routes = defineRoutes({
	home: {
		path: '/',
		exact: true,
	},
	params: {
		path: '/param-test/:id/:thing',
		exact: true,
		params: ['id', 'thing'] as const,
	},
});
