import debug from 'debug';
import React from 'react';
import {TestMutation} from './TestMutation';
import {TestQuery} from './TestQuery';
import {TestSubscription} from './TestSubscription';
// import TestCustomTypes from './TestCustomTypes';

const d = debug('imperium.examples.examples/web.sample-graphql.components.GraphqlTest');

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
