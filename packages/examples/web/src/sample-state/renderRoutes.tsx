import React from 'react';
import {routes} from './routes';
import StateExample from './components/StateExample';

export const renderRoutes = routes.renderRoutes({
	state: () => <StateExample />,
});
