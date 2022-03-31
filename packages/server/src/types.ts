import type {Connectors} from '@imperium/connector';
import type {ImperiumServer} from './ImperiumServer';

/**
 * Used to define custom server modules.
 */
export interface ImperiumServerModule<Context> {
	name: string;
	endpoints?: (server: ImperiumServer<Context>) => Promise<void>;
	startup?: (server: ImperiumServer<Context>) => Promise<void>;
}

/**
 * The config required to create a new ImperiumServer.
 */
export interface ImperiumServerConfig<Context> {
	connectors: Connectors;
	serverModules: () => ImperiumServerModule<Context>[];
	contextCreator: (connector: Connectors) => Promise<Context>;
	httpPort?: number;
}
