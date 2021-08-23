import React from 'react';
import {createRouteSlice} from '@imperium/router';
import loadable from '@loadable/component';

const ApolloCache = loadable<any>(() => import('./components/ApolloCache'));

export const routes = createRouteSlice({
	apolloCache: {
		path: '/sample-apollocache',
		exact: true,
		render: () => <ApolloCache />,
	},
});
