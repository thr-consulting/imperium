import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import {routes} from './routes';
import {useTestDatahook} from './useTestDatahook';

const d = debug('imperium.web.test-datahook.layout');

export const layout: LayoutData = {
	dataHooks: [
		{
			routeMatch: routes.match.testDatahookB,
			dataHook: useTestDatahook,
		},
	],
	secondaryMenu: [
		{
			text: 'Test Datahook A',
			to: routes.to.testDatahookA(),
		},
		{
			text: 'Test Datahook B',
			to: routes.to.testDatahookB({value: 'val1'}),
		},
	],
};
