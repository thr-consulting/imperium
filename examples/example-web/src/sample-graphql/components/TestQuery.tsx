import {useQuery} from '@apollo/client';
import debug from 'debug';
import {Button, Segment} from 'semantic-ui-react';
import query from './query.graphql';

const d = debug('imperium.example-web.sample-graphql.components.TestQuery');

export function TestQuery() {
	const {loading, error, data, refetch} = useQuery(query);

	d('query', loading, error, data);
	if (loading) return null;
	if (error) {
		d(error);
		return null;
	}

	return (
		<Segment inverted>
			<p>Query: {loading ? 'Loading' : data.getSubscriptionValue.id}</p>
			<Button
				size="mini"
				onClick={() => {
					refetch().catch(e => d(e));
				}}
			>
				Refetch Query
			</Button>
		</Segment>
	);
}
