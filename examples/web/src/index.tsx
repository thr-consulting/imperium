import {ImperiumClient} from '@imperium/client';
import {ContentRouter} from '@imperium/router';
import {Environment} from '@thx/env';
import {debug} from 'debug';
import 'react-datepicker/dist/react-datepicker.css';
import {clientModules} from './core/clientModules';
import './core/styles.css';

const d = debug('imperium.web');

// This proves that our src/env.ts entry point is working properly.
// eslint-disable-next-line no-console
console.log(Environment.getInt('IMP_PERMISSION_DATALOADER_LRU_MAX'));

// This shows that our env.js script runs before our bundled code
// @ts-ignore
// eslint-disable-next-line no-console,no-underscore-dangle
console.log(window.__IMPERIUM_ENV__);

// This shows that environment variables can be hardcoded into the bundle from .env
// @ts-ignore
// eslint-disable-next-line no-console
console.log(import.meta.env.VITE_BLAH);

const client = new ImperiumClient({
	clientModules,
	render: props => {
		return <ContentRouter {...props} />;
	},
});

client.start().catch(err => {
	// eslint-disable-next-line no-console
	console.log(err);
});

// Testing dynamic chunk
import('~common/test').then(({test}) => {
	test();
});
