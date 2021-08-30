import {defineRoutes} from '@imperium/router';

export const routes = defineRoutes({
	login: {
		path: '/login',
		exact: true,
	},
	authTest: {
		path: '/auth-test',
		exact: true,
	},
});
