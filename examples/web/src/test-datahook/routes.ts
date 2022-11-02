import {defineRoutes} from '@imperium/router';

export const routes = defineRoutes({
	testDatahookA: {
		path: '/test-datahook/a',
	},
	testDatahookB: {
		path: '/test-datahook/b/:value',
		params: ['value'] as const,
	},
});
