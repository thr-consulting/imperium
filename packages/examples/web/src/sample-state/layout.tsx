import React from 'react';
import type {LayoutData} from '@imperium/layout';
// import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import StateExample from './components/StateExample';
import {routes} from './routes';
import {routes as sampleRoutes} from '../sample/routes';
import {useSampleState} from './state';

const d = debug('imperium.examples.web.sample-state.layout');

export const layout: LayoutData = {
	secondaryMenu: [
		{
			to: routes.to.state(),
			text: 'State',
		},
		{
			text: 'Visible when today',
			stateSelectorHook: useSampleState,
			// visible: {date: {$localDate_eq: LocalDate.now()}},
		},
		{
			text: 'Moved Item 1',
			to: sampleRoutes.to.home(),
			moveToKey: 'dropdown',
		},
		{
			text: 'State Dropdown',
			dropdown: [
				{
					text: 'Moved Item 2',
					to: sampleRoutes.to.home(),
					moveToKey: 'dropdown',
					weight: 5,
				},
				{
					text: 'Home',
					to: sampleRoutes.to.home(),
					weight: 1,
				},
			],
		},
	],
};

export const routeProps = routes.renderRouteProps({
	state: () => <StateExample />,
});
