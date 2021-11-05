import type {LayoutData} from '@imperium/layout/src';
import React from 'react';
import ComponentUsingAuth from './components/ComponentUsingAuth';
import Login from './components/Login';
import {routes} from './routes';

export const layout: Partial<LayoutData> = {
	primaryMenu: [
		{
			to: routes.to.login(),
			text: 'Login',
			position: 'right',
		},
	],
	secondaryMenu: [
		{
			to: routes.to.authTest(),
			text: 'Auth',
		},
	],
};

export const routeProps = routes.renderRouteProps({
	authTest: () => <ComponentUsingAuth />,
	login: () => <Login />,
});
