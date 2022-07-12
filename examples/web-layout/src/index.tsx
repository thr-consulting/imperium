import {ImperiumClient} from '@imperium/client';
import {ContentRouter} from '@imperium/router';
import {debug} from 'debug';
import {clientModules} from './core/clientModules';

const d = debug('imperium.web');

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
