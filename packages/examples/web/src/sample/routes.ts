import debug from 'debug';
import {defineRoutes} from '@imperium/router';

const d = debug('imperium.example.web.sample.routes');

export const routes = defineRoutes({
	home: {
		path: '/',
		exact: true,
	},
	ving: {
		path: '/ving/:id/:thing',
		exact: true,
		props: ({id, thing}: {id: string; thing: string}) => ({id, thing}),
	},
});
