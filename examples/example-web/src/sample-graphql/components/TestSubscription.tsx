import debug from 'debug';
import {Segment} from 'semantic-ui-react';
import {useOnStuffSubscription} from './subscribe';

const d = debug('imperium.example-web.sample-graphql.components.TestSubscription');

export function TestSubscription() {
	// const {data, loading, error} = useSubscription(subscribe);
	const {data, loading, error} = useOnStuffSubscription();

	d('subscription', loading ? 'loading' : '', error ? 'error' : '', data);
	if (loading) {
		return null;
	}
	if (error) {
		d(error);
	}
	d(data);

	return <Segment inverted>Test Subscription: {loading ? 'Waiting...' : data?.subscriptionValueChanged?.id}</Segment>;
}
