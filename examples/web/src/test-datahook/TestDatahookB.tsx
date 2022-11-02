import debug from 'debug';
import {useTestDatahookState} from './state';

const d = debug('imperium.web.test-datahook.TestDatahookB');

export function TestDatahookB() {
	const {text} = useTestDatahookState();
	return <div>Screen B. Value: {text}</div>;
}
