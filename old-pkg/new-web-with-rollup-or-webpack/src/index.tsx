import {ImperiumClient} from '@imperium/client';
import {clientModules} from './core/clientModules';
// import {debug} from 'debug';
//
// const d = debug('fasd');
// d('hello world');
// console.log('hello world');
// console.log(clientModules());

const client = new ImperiumClient({
	clientModules,
	render: () => {
		return <div>hello world</div>;
	},
});

client.start().catch(err => {
	console.log(err);
});

import('./test').then(({test}) => {
	test();
});
