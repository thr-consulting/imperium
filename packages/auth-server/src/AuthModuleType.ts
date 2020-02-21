import {IContextManager} from '@imperium/server';
// eslint-disable-next-line import/no-cycle
import {AuthModuleContext} from './index';
import {ServiceInfo} from './types';

export type AuthContextManager = IContextManager<ReturnType<typeof AuthModuleContext>>;

export interface ImperiumAuthServerModule<ContextManager extends AuthContextManager = AuthContextManager> {
	auth?: {
		getServiceInfo: (identifier: string, ctx: ContextManager) => Promise<ServiceInfo | null>;
	};
}
