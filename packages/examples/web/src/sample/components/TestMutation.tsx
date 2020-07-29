import debug from 'debug';
import React from 'react';
import {useMutation} from '@apollo/client';
import mutate from '../graphql/mutate.graphql';

const d = debug('app.core.TestMutation');

export default function TestMutation() {
	const [doChange, {data, loading}] = useMutation(mutate);

	d('mutation', loading, data);

	return (
		<div>
			<button type="button" onClick={() => doChange()}>
				Test Mutation
			</button>
		</div>
	);
}
