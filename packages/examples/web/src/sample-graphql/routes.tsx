import React from 'react';
import {createRouteSlice} from '@imperium/router';
import loadable from '@loadable/component';

const GraphqlTest = loadable<any>(() => import('./components/GraphqlTest'));

export const routes = createRouteSlice({
	sampleGraphql: {
		path: '/sample-graphql',
		exact: true,
		render: () => <GraphqlTest />,
	},
});
