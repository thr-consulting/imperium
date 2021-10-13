import debug from 'debug';
import React, {useContext} from 'react';
import {ImperiumGraphqlContext} from '@imperium/graphql-client';
import {Button} from 'semantic-ui-react';
import {TestMutation} from './TestMutation';
import {TestQuery} from './TestQuery';
import {TestSubscription} from './TestSubscription';
// import TestCustomTypes from './TestCustomTypes';

const d = debug('imperium.examples.examples/web.sample-graphql.components.GraphqlTest');

export default function GraphqlTest() {
	const {reconnect} = useContext(ImperiumGraphqlContext);

	return (
		<>
			<h1>GraphqlTest</h1>
			<TestQuery />
			<TestMutation />
			<TestSubscription />
			{/* <TestCustomTypes /> */}
			<Button onClick={() => reconnect()}>Reconnect</Button>
		</>
	);
}
