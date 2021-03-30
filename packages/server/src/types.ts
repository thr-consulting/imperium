import type {Connectors} from '@imperium/connector';
import type {ImperiumServer} from './ImperiumServer';

/**
 * Used to define custom server modules.
 */
export interface ImperiumServerModule<Context> {
	name: string;
	endpoints?: (server: ImperiumServer<Context>) => void;
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

/**
 * The shape of the configuration object used to configure Imperium Dev launcher.
 */
export interface ImperiumConfig {
	development?: {
		clientPort?: number;
		workerCrashDelay?: number;
		workerCrashMax?: number;
		imperiumDevelopmentAliases?: boolean;
	};
	production?: {
		path?: string;
		client?: {
			minimize?: boolean;
			devtool?: boolean;
			vendorChunk?: string[];
		};
		server?: {
			minimize?: boolean;
			devtool?: boolean;
			externals?: string[];
		};
	};
	webpack?: {
		client?: {
			rules: any[];
		};
		server?: {
			rules: any[];
		};
	};
	source?: {
		projectRoot?: string;
		imperiumRoot?: string;
		path?: string;
		serverIndex?: string;
		clientIndex?: string;
		configModules?: string;
		watchPaths?: string[];
	};
	html?: {
		template?: string;
		meta?: {
			[key: string]: string;
		};
		templateParameters?: {
			[key: string]: string;
		};
	};
}
