import React from 'react';
import {createRouteSlice} from '@imperium/router';
import StateExample from './components/StateExample';

export const routes = createRouteSlice({
	state: {
		path: '/state',
		exact: true,
		render: () => <StateExample />,
	},
});
