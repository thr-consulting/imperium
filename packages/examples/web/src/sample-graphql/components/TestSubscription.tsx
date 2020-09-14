import debug from 'debug';
import React from 'react';
import {useSubscription} from '@apollo/client';
import {Segment} from 'semantic-ui-react';
import subscribe from './subscribe.graphql';

const d = debug('app.core.TestSubscription');

export function TestSubscription() {
	const {data, loading} = useSubscription(subscribe);

	d('subscription', loading, data);

	return <Segment inverted>Test Subscription: {loading ? 'Waiting...' : data.subscriptionValueChanged.id}</Segment>;
}
