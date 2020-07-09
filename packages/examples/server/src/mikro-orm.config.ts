import {entities} from '@imperium/example-domain-advanced';
import 'dotenv/config';

export default {
	entities: Object.values(entities),
	clientUrl: process.env.POSTGRESQL_URL,
	type: 'postgresql',
};
