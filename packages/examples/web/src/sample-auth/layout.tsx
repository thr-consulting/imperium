import React from 'react';
import type {LayoutData} from '@imperium/layout/src';
import {routes} from './routes';
import ComponentUsingAuth from './components/ComponentUsingAuth';
import Login from './components/Login';

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
