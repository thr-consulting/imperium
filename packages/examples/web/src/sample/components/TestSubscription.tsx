import debug from 'debug';
import React from 'react';
import {useSubscription} from '@apollo/react-hooks';
import subscribe from '../graphql/subscribe.graphql';

const d = debug('app.core.TestSubscription');

export default function TestSubscription() {
	const {data, loading} = useSubscription(subscribe);

	d('subscription', loading, data);

	return <div>Test Subscription: {loading ? 'Loading' : data.counterChanged}</div>;
}
