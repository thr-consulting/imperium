import debug from 'debug';
import {defineRoutes} from '@imperium/router';

const d = debug('imperium.example.web.sample.routes');

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
