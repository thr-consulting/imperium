import debug from 'debug';
import React from 'react';
import {Button, Segment} from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import mutate from './mutate.graphql';

const d = debug('app.core.TestMutation');

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
