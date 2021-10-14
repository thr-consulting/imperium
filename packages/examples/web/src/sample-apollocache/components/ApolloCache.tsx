import {useQuery} from '@apollo/client';
import debug from 'debug';
import React, {useState} from 'react';
import {Button, Segment} from 'semantic-ui-react';
import query from './query.graphql';

const d = debug('imperium.examples.web.sample-apollocache.components.ApolloCache');

export default function ApolloCache() {
	const [filter, setFilter] = useState('PHONE');
	const {loading, error, data} = useQuery(query, {
		variables: {
			filter,
		},
	});

	d('query', loading, error, data);
	if (loading) return null;
	if (error) {
		d(error);
		return null;
	}

	return (
		<Segment inverted>
			<Button
				size="mini"
				onClick={() => {
					setFilter('EMAIL');
				}}
			>
				Filter for Email
			</Button>
			<ul>
				{data.getCacheList.map((v: any) => (
					<li key={v.name}>
						{v.id}: {v.name} {v.type}
					</li>
				))}
			</ul>
		</Segment>
	);
}
