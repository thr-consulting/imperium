import {Request, Response, NextFunction, Application} from 'express';
import {Server} from 'http';

export interface AuthContext {
	id: string;
	permissions: string[];
	hasPermission: (perms: string | string[]) => boolean;
	getCache: (key: string | string[]) => Promise<boolean | null>;
	setCache: (key: string | string[], allowed?: boolean, expire?: number) => Promise<void>;
	invalidateCache: (key: string | string[]) => Promise<void>;
}

export type ContextMapFunc = (server: IImperiumServer, contextManager: IContextManager) => ContextMap;
export type Context = any;
export type ContextMap = {
	readonly [prop: string]: Context;
};
export type IContextManager<T extends ContextMap = any> = {
	addContext(contextFunc: ContextMapFunc): void;
	auth: AuthContext;
	readonly server: IImperiumServer;
} & T;

export type ImperiumEnvironment<T = boolean | string | number> = {
	[key: string]: T | ImperiumEnvironment;
};

export interface ImperiumRequest<T = any> extends Request {
	contextManager: T extends IContextManager ? T : IContextManager<T>;
}
export type ImperiumRequestHandler<T = any> = (req: ImperiumRequest<T>, res: Response, next: NextFunction) => void;

export interface MiddlewareMap {
	[key: string]: () => ImperiumRequestHandler;
}

export type StartupFunc = (server: IImperiumServer) => Promise<any | void>;

export type ImperiumServerModule = {
	name: string;
	environment?: () => ImperiumEnvironment;
	middleware?: (server: IImperiumServer) => MiddlewareMap;
	endpoints?: (server: IImperiumServer) => void;
	startup?: StartupFunc;
} & ContextMap;
export type ImperiumServerModuleFunction = () => ImperiumServerModule;

export type ImperiumConnectorsMap = {[connectorName: string]: any};
export interface ImperiumConnectors {
	create(server: IImperiumServer): Promise<ImperiumConnectorsMap>;
	close(): Promise<void>;
}

export interface IImperiumServer {
	addEnvironment(key: string, value: ImperiumEnvironment): void;
	start(): Promise<this>;
	stop(): Promise<void>;
	readonly connectors: ImperiumConnectorsMap;
	readonly modules: ImperiumServerModule[];
	readonly environment: ImperiumEnvironment;
	readonly expressApp: Application;
	readonly httpServer: Server;
	readonly middleware: MiddlewareMap;
	readonly initialContextManager: IContextManager;
}

export interface IImperiumConfig {
	development?: {
		clientPort?: number;
		workerCrashDelay?: number;
		workerCrashMax?: number;
		imperiumDevelopmentAliases?: boolean;
	};
	production: {
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
