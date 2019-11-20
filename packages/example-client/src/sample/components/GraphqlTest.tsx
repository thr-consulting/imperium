import debug from 'debug';
import React from 'react';
import {Link} from 'react-router-dom';
import TestQuery from './TestQuery';
import TestSubscription from './TestSubscription';
import TestMutation from './TestMutation';

const d = debug('app.sample.GraphqlTest');

export default function GraphqlTest() {
	return (
		<>
			<h1>GraphqlTest</h1>
			<Link to="/">Route to Home</Link>
			<TestQuery />
			<TestMutation />
			<TestSubscription />
		</>
	);
}
