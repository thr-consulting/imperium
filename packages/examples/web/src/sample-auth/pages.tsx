import React from 'react';
import {createPages} from '@imperium/layout';
import {useCan} from '@imperium/auth-client';
import {routes} from './routes';
import Login from './components/Login';
import ComponentUsingAuth from './components/ComponentUsingAuth';

export const routeProps = createPages(routes, {
	login: {
		content: () => <Login />,
	},
	authTest: {
		permissionSelectorHook: () => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [getStuff] = useCan('getStuff', {values: 'stuff'});
			return {getStuff};
		},
		content: () => {
			return <ComponentUsingAuth />;
		},
	},
});
