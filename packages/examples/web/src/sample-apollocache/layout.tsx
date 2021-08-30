import React from 'react';
import type {LayoutData} from '@imperium/layout/src';
import {routes} from './routes';
import ApolloCache from './components/ApolloCache';

export const routeProps = routes.renderRouteProps({
	apolloCache: () => <ApolloCache />,
});

export const layout: Partial<LayoutData> = {
	sidebar: [
		{
			to: routes.to.apolloCache(),
			text: 'Apollo Cache',
		},
	],
};
