import type {LayoutData} from '@imperium/layout/src';
import loadable from '@loadable/component';
import React from 'react';
import {routes} from './routes';

const GraphqlTest = loadable<any>(() => import('./components/GraphqlTest'));

export const layout: Partial<LayoutData> = {
	sidebar: [
		{
			to: routes.to.sampleGraphql(),
			text: 'Graphql',
		},
	],
};

export const routeProps = routes.renderRouteProps({
	sampleGraphql: () => <GraphqlTest />,
});
