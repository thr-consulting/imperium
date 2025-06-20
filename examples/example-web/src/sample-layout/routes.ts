import {defineRoutes} from '@imperium/router';

export const routes = defineRoutes({
	withParam: {
		path: '/layout/param/:myParam',
		params: ['myParam'] as const,
	},
	noParam: {
		path: '/layout/noParam',
	},
	content: {
		path: '/layout/content',
	},
});
