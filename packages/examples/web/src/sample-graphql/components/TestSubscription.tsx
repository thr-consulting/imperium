import {useSubscription} from '@apollo/client';
import debug from 'debug';
import React from 'react';
import {Segment} from 'semantic-ui-react';
import subscribe from './subscribe.graphql';

const d = debug('imperium.examples.examples/web.sample-graphql.components.TestSubscription');

export function TestSubscription() {
	const {data, loading} = useSubscription(subscribe);

	d('subscription', loading, data);

	return <Segment inverted>Test Subscription: {loading ? 'Waiting...' : data.subscriptionValueChanged.id}</Segment>;
}
