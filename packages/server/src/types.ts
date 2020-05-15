import type {Connector} from '@imperium/context-manager';
import type {ImperiumServer} from './ImperiumServer';

/**
 * Used to define custom server modules.
 */
export interface ImperiumServerModule<Context, Connectors extends Connector> {
	name: string;
	endpoints?: (server: ImperiumServer<Context, Connectors>) => void;
	startup?: (server: ImperiumServer<Context, Connectors>, context: Context) => Promise<void>;
}

/**
 * The config required to create a new ImperiumServer.
 */
export interface ImperiumServerConfig<Context, Connectors extends Connector> {
	connectors: Connectors;
	serverModules: () => ImperiumServerModule<Context, Connectors>[];
	contextCreator: (connector: Connectors) => Context; // TODO add auth here
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
