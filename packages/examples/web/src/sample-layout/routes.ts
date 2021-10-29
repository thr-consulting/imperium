import {defineRoutes} from '@imperium/router';

export const routes = defineRoutes({
	withParam: {
		path: '/layout/:myParam',
		params: ['myParam'] as const,
	},
	noParam: {
		path: '/layout/noParam',
	},
});
