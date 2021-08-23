import React from 'react';
import debug from 'debug';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import {ContentRouter} from '@imperium/router';
import {ImperiumClient} from '@imperium/client';
import {clientModules} from './clientModules';
import './styles.css';
import {ErrorBoundary} from './ErrorBoundary';

const d = debug('app.client');

const client = new ImperiumClient({
	clientModules,
	render: props => <ContentRouter errorBoundary={ErrorBoundary} {...props} />,
});

client.start().catch(err => {
	d(err);
});
