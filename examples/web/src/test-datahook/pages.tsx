import {createPages} from '@imperium/layout';
import debug from 'debug';
import {SampleSidebar} from '../SampleSidebar';
import {TestDatahookA} from './TestDatahookA';
import {TestDatahookB} from './TestDatahookB';
import {routes} from './routes';

const d = debug('imperium.web.test-datahook.pages');

export const routeProps = createPages(routes, {
	testDatahookA: {
		content: () => <TestDatahookA />,
		sidebar: [{render: SampleSidebar}],
	},
	testDatahookB: {
		content: () => <TestDatahookB />,
		sidebar: [{render: SampleSidebar}],
	},
});
