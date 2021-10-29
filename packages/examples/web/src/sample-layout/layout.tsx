import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import React from 'react';
import LayoutExample from './components/LayoutExample';
import {routes} from './routes';
import {useGetData} from './hooks/useGetData';
import {useLayoutState} from './state';

const d = debug('imperium.examples.web.sample-layout.layout');

export const routeProps = routes.renderRouteProps({
	noParam: () => <LayoutExample />,
	withParam: () => <LayoutExample />,
});

export const layout: LayoutData = {
	dataHooks: [
		{
			routeMatch: routes.match.withParam,
			dataHook: useGetData,
		},
	],
	menubar: [
		{
			text: 'MenuOption',
			visible: {
				stateSelectorHook: useLayoutState,
				query: v => {
					d(v);
					return true;
				},
			},
		},
	],
};
