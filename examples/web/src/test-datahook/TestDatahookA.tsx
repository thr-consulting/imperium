import {useTestDatahookState} from './state';

export function TestDatahookA() {
	const {text} = useTestDatahookState();

	return <div>Test datahook state: {text}</div>;
}
