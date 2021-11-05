import type {LayoutData} from '@imperium/layout/src';
import React from 'react';
import ApolloCache from './components/ApolloCache';
import {routes} from './routes';

export const routeProps = routes.renderRouteProps({
	apolloCache: () => <ApolloCache />,
});

export const layout: Partial<LayoutData> = {
	secondaryMenu: [
		{
			to: routes.to.apolloCache(),
			text: 'Apollo Cache',
		},
	],
};
