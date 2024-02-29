import {createPages} from '@imperium/layout';
import debug from 'debug';
import {TestDatahookA} from './TestDatahookA';
import {TestDatahookB} from './TestDatahookB';
import {routes} from './routes';

const d = debug('imperium.web.test-datahook.pages');

export const routeProps = createPages(routes, {
	testDatahookA: {
		content: () => <TestDatahookA />,
	},
	testDatahookB: {
		content: () => <TestDatahookB />,
	},
});
