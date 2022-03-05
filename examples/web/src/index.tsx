import {Environment} from '@thx/env';
import {defaults as authorizationDefaults} from '@imperium/authorization';
import {ImperiumClient} from '@imperium/client';
import {debug} from 'debug';
import {ContentRouter} from '@imperium/router';
import {clientModules} from './core/clientModules';

const d = debug('fasd');

Environment.addDefaults(authorizationDefaults);

console.log(Environment.getInt('IMP_PERMISSION_DATALOADER_LRU_MAX'));

// @ts-ignore
// eslint-disable-next-line no-console
console.log(import.meta.env.VITE_BLAH);

const client = new ImperiumClient({
	clientModules,
	render: props => {
		return <ContentRouter {...props} />;
		// return <div>hello world</div>;
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
