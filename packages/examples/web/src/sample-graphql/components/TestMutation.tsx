import {useMutation} from '@apollo/client';
import debug from 'debug';
import React from 'react';
import {Button, Segment} from 'semantic-ui-react';
import mutate from './mutate.graphql';

const d = debug('imperium.examples.examples/web.sample-graphql.components.TestMutation');

export function TestMutation() {
	const [doChange, {data, loading}] = useMutation(mutate);

	d('mutation', loading, data);

	return (
		<Segment inverted>
			<Button color="orange" onClick={() => doChange()}>
				Test Mutation
			</Button>
		</Segment>
	);
}
