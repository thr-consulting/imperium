import {ImperiumClient} from '@imperium/client';
import {ContentRouter} from '@imperium/router';
import '@thx/mingo-types';
import debug from 'debug';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {ErrorBoundary} from './ErrorBoundary';
import {clientModules} from './clientModules';
import './styles.css';

const d = debug('imperium.examples.web.core.client');

const client = new ImperiumClient({
	clientModules,
	render: props => {
		// imperiumClient - injected by @imperium/client
		// layout - injected by @imperium/layout
		// render - injected by @imperium/client
		// routes - injected by @imperium/router
		return <ContentRouter {...props} />; // errorBoundary={ErrorBoundary}
	},
});

client.start().catch(err => {
	d(err);
});
