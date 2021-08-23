import React from 'react';
import loadable from '@loadable/component';
import {createRouteSlice} from '@imperium/router';

const HelloWorld = loadable<any>(() => import('./components/HelloWorld'));

export const routes = createRouteSlice({
	home: {
		path: '/',
		exact: true,
		render: () => <HelloWorld />,
	},
});
