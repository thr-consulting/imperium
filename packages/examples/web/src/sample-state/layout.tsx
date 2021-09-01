import debug from 'debug';
import React from 'react';
import type {LayoutData} from '@imperium/layout/src';
import {LocalDate} from '@js-joda/core';
import {routes} from './routes';
import StateExample from './components/StateExample';
import {useSampleState} from './state';

const d = debug('imperium.examples.web.sample-state.layout');

export const layout: Partial<LayoutData> = {
	sidebar: [
		{
			to: routes.to.state(),
			text: 'State',
		},
		{
			text: 'Visible when today',
			visible: {
				query: data => LocalDate.now().equals(data.date),
				selectorHook: useSampleState,
			},
		},
	],
};

export const routeProps = routes.renderRouteProps({
	state: () => <StateExample />,
});
