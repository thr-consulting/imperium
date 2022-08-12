import type {LayoutData} from '@imperium/layout';
import {LocalDate} from '@js-joda/core';
// import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import {useLayoutState} from '../sample-layout/state';
import {routes as sampleRoutes} from '../sample/routes';
import StateExample from './components/StateExample';
import {routes} from './routes';
import {useSampleStateIssue} from './state';

const d = debug('imperium.web.sample-state.layout');

export const layout: LayoutData = {
	secondaryMenu: [
		{
			to: routes.to.state(),
			text: 'State Issue',
		},
		{
			text: 'Visible when today - State issues',
			stateSelectorHook: [useLayoutState, useSampleStateIssue],
			visible: data => {
				if (data.state.date instanceof LocalDate) {
					return data.state.date.isEqual(LocalDate.now());
				}
				return false;
			},
		},
	],
};

export const routeProps = routes.renderRouteProps({
	state: () => <StateExample />,
});
