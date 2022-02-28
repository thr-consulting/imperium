import {ImperiumGraphqlContext} from '@imperium/graphql-client';
import {Environment} from '@thx/env';
import debug from 'debug';
import {useContext} from 'react';
import {Button} from 'semantic-ui-react';
import {TestMutation} from './TestMutation';
import {TestQuery} from './TestQuery';
import {TestSubscription} from './TestSubscription';
// import TestCustomTypes from './TestCustomTypes';

const d = debug('imperium.examples.web.sample-graphql.components.GraphqlTest');

export default function GraphqlTest() {
	const {reconnect} = useContext(ImperiumGraphqlContext);
	const subscriptionsEnabled = Environment.getString('graphqlws') !== '';

	return (
		<>
			<h1>GraphqlTest</h1>
			<TestQuery />
			<TestMutation />
			{subscriptionsEnabled ? <TestSubscription /> : null}
			{/* <TestCustomTypes /> */}
			<Button onClick={() => reconnect()}>Reconnect</Button>
		</>
	);
}
