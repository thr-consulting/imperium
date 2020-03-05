import debug from 'debug';
import React from 'react';
import TestQuery from './TestQuery';
import TestSubscription from './TestSubscription';
import TestMutation from './TestMutation';
import TestCustomTypes from './TestCustomTypes';
import Links from '../../core/Links';

const d = debug('app.sample.GraphqlTest');

export default function GraphqlTest() {
	return (
		<>
			<h1>GraphqlTest</h1>
			<TestQuery />
			<TestMutation />
			<TestSubscription />
			<TestCustomTypes />
			<Links />
		</>
	);
}
