import debug from 'debug';
import React from 'react';
import {Button, Segment} from 'semantic-ui-react';
import {useQuery} from '@apollo/client';
import query from './query.graphql';

const d = debug('app.core.TestQuery');

export function TestQuery() {
	const {loading, error, data, refetch} = useQuery(query);

	d('query', loading, error, data);
	if (loading) return null;

	return (
		<Segment inverted>
			<p>Query: {loading ? 'Loading' : data.getSubscriptionValue.id}</p>
			<Button
				size="mini"
				onClick={() => {
					refetch();
				}}
			>
				Refetch Query
			</Button>
		</Segment>
	);
}
