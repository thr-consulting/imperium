import {generateVisible} from '@imperium/layout';
import type {LayoutData} from '@imperium/layout/src';
import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import React from 'react';
import StateExample from './components/StateExample';
import {routes} from './routes';
import {useSampleState} from './state';

const d = debug('imperium.examples.web.sample-state.layout');

export const layout: LayoutData = {
	sidebar: [
		{
			to: routes.to.state(),
			text: 'State',
		},
		{
			text: 'Visible when today',
			visible: generateVisible({
				// query: (data) => LocalDate.now().equals(data.date),
				query: {date: {$localDate_eq: LocalDate.now()}},
				selectorHook: useSampleState,
			}),
		},
	],
};

export const routeProps = routes.renderRouteProps({
	state: () => <StateExample />,
});
