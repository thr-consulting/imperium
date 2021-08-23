import React from 'react';
import {createRouteSlice} from '@imperium/router';
import loadable from '@loadable/component';

const Login = loadable<any>(() => import('./components/Login'));
const ComponentUsingAuth = loadable<any>(() => import('./components/ComponentUsingAuth'));

export const routes = createRouteSlice({
	login: {
		path: '/login',
		exact: true,
		render: () => <Login />,
	},
	authTest: {
		path: '/auth-test',
		exact: true,
		render: () => <ComponentUsingAuth />,
	},
});
