import {ImperiumServerModule} from '@imperium/server';
import {ImperiumAuthServerModule} from '@imperium/auth-server';
import debug from 'debug';
import {SampleUserContext} from './models/SampleUser';
import {ContextManager} from '../serverTypes';

const d = debug('imperium.example-server.user');

export function SampleuserContext() {
	return {
		...SampleUserContext(),
	};
}

export default function sampleuser(): ImperiumServerModule & ImperiumAuthServerModule {
	return {
		name: 'SampleUser',
		auth: {
			getServiceInfo(identifier: string, ctx: ContextManager) {
				return ctx.SampleUser.getServiceInfo(identifier, ctx);
			},
		},
		context: SampleuserContext,
	};
}
