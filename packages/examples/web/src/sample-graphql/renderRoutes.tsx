import React from 'react';
import loadable from '@loadable/component';
import {routes} from './routes';

const GraphqlTest = loadable<any>(() => import('./components/GraphqlTest'));

export const renderRoutes = routes.renderRoutes({
	sampleGraphql: () => <GraphqlTest />,
});
