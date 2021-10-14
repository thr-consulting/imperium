import {defineRoutes} from '@imperium/router';
import debug from 'debug';

const d = debug('imperium.examples.web.sample.routes');

export const routes = defineRoutes({
	home: {
		path: '/',
	},
	params: {
		path: '/param-test/:id/:thing',
		params: ['id', 'thing'] as const,
	},
	paramsTwo: {
		path: '/param-test/:id/:thing/two',
		params: ['id', 'thing'] as const,
	},
});
