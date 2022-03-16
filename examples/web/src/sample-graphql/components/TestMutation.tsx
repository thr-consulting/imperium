import {useMutation} from '@apollo/client';
import debug from 'debug';
import {Button, Segment} from 'semantic-ui-react';
import mutate from './mutate.graphql';

const d = debug('imperium.web.sample-graphql.components.TestMutation');

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
