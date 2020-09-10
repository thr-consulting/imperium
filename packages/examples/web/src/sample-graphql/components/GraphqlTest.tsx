import debug from 'debug';
import React from 'react';
import {TestQuery} from './TestQuery';
import {TestMutation} from './TestMutation';
import {TestSubscription} from './TestSubscription';
// import TestCustomTypes from './TestCustomTypes';

const d = debug('app.sample.GraphqlTest');

export default function GraphqlTest() {
	return (
		<>
			<h1>GraphqlTest</h1>
			<TestQuery />
			<TestMutation />
			<TestSubscription />
			{/* <TestCustomTypes /> */}
		</>
	);
}
