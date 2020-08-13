import debug from 'debug';
import React from 'react';
import {useQuery} from '@apollo/client';
import query from '../graphql/query.graphql';

const d = debug('app.core.TestQuery');

export default function TestQuery() {
	const {loading, error, data} = useQuery(query);

	d('query', loading, error, data);

	return <div>Test Query: {loading ? 'Loading' : data.getCounter}</div>;
}
