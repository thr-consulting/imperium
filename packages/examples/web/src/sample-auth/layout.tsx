import type {LayoutData} from '@imperium/layout/src';
import React from 'react';
import ComponentUsingAuth from './components/ComponentUsingAuth';
import Login from './components/Login';
import {routes} from './routes';

export const layout: Partial<LayoutData> = {
	sidebar: [
		{
			to: routes.to.authTest(),
			text: 'Auth',
		},
	],
	menubar: [
		{
			to: routes.to.login(),
			text: 'Login',
			position: 'right',
		},
	],
};

export const routeProps = routes.renderRouteProps({
	authTest: () => <ComponentUsingAuth />,
	login: () => <Login />,
});
