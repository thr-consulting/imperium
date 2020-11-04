import React from 'react';
import debug from 'debug';
import 'semantic-ui-css/semantic.min.css';
import {RouteDirector} from '@imperium/router';
import {ImperiumClient} from '@imperium/client';
import DefaultComponent from '~common/DefaultComponent';
import {clientModules} from './clientModules';
import {routeDefaults} from '../layout';

const d = debug('app.client');

const client = new ImperiumClient({
	clientModules,
	render(props) {
		return <RouteDirector routeDefaults={routeDefaults} rootRoute={{path: '/', content: DefaultComponent, exact: true}} {...props} />;
	},
});

client.start().catch(err => {
	d(err);
});
