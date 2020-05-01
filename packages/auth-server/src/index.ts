import {Connector, ContextManager} from '@imperium/context-manager';
import {AuthContext} from './models/Auth';
import {RoleContext} from './models/Role';

export {AuthServerModule as default} from './AuthServerModule';
export {ImperiumAuthServerModule, ServiceInfo} from './types';

type AuthRequiredConnectors = Connector<{}>;

export function createContext(connector: AuthRequiredConnectors) {
	return new ContextManager(
		{
			Role: RoleContext,
			Auth: AuthContext,
		},
		connector,
	);
}

export type Context = ReturnType<typeof createContext>;
