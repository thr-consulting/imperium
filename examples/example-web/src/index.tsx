import {ImperiumClient} from '@imperium/client';
import {debug} from 'debug';
import 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {render} from 'react-dom';
import {Root} from './Root';
import {clientModules} from './core/clientModules';
import './core/styles.css';

const d = debug('imperium.example-web');

// This shows that our env.js script runs before our bundled code
// @ts-ignore
// eslint-disable-next-line no-console,no-underscore-dangle
console.log(window.__ENV__);

// This shows that environment variables can be hardcoded into the bundle from .env
// @ts-ignore
// eslint-disable-next-line no-console
console.log(import.meta.env.VITE_BLAH);

const client = new ImperiumClient({
	clientModules,
	rootComponent: Root,
});

client
	.start()
	.then(Imperium => {
		d('Rendering root component');
		render(<Imperium />, document.getElementById('root'));
	})
	.catch(err => {
		// eslint-disable-next-line no-console
		console.log(err);
	});

// Testing dynamic chunk
import('~common/test')
	.then(({test}) => {
		test();
	})
	.catch(err => d(err));
