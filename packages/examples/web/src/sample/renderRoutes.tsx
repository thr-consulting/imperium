import React from 'react';
import debug from 'debug';
import {routes} from './routes';
import {ParamTest} from './components/ParamTest';
import HelloWorld from './components/HelloWorld';

const d = debug('imperium.example.web.samples.routeRender');

export const renderRoutes = routes.renderRoutes({
	home: () => <HelloWorld />,
	ving: () => <ParamTest />,
});
