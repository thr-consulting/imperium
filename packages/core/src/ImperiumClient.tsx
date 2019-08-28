import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';

export default class ImperiumClient {
	start() {
		// eslint-disable-next-line no-console
		console.log('client');
		render(<Root />, document.getElementById('root'));
	}
}
