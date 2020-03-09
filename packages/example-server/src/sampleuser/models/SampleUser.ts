import {ServiceInfo} from '@imperium/auth-server';
import {ContextManager} from '../../serverTypes';

export class SampleUser {
	static getServiceInfo(identifier: string, ctx: ContextManager): ServiceInfo {
		// Yes, let's "lookup" the identifier here...
		return {
			id: 'myid',
			roles: ['roleA', 'sysadmin'],
			password: {
				bcrypt: '$2b$10$n3hj9rG5QU0ztEuQknsD6umsMhIYdcNx3zrO2eQJZI/gXaCTPzz2.', // blah
			},
		};
	}
}

export function SampleUserContext() {
	return {
		SampleUser,
	};
}
