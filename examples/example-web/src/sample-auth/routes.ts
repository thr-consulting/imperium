import {defineRoutes} from '@imperium/router';

export const routes = defineRoutes({
	login: {
		path: '/login',
		isPublic: true,
	},
	authTest: {
		path: '/auth-test',
	},
});
