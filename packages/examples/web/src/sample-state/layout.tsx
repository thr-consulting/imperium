import React from 'react';
import type {LayoutData} from '@imperium/layout/src';
import {routes} from './routes';
import StateExample from './components/StateExample';

export const layout: Partial<LayoutData> = {
	sidebar: [
		{
			to: routes.to.state(),
			text: 'State',
		},
	],
};

export const routeProps = routes.renderRouteProps({
	state: () => <StateExample />,
});
