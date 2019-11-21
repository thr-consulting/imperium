import {Request, Response, NextFunction, Application} from 'express';
import {Server} from 'http';

export type ContextMapFunc = (server: IImperiumServer, contextManager: IContextManager) => ContextMap;
export type Context = any;
export type ContextMap = {
	readonly [prop: string]: Context;
};
export type IContextManager<T extends ContextMap = any> = {
	addContext(contextFunc: ContextMapFunc): void;
	auth: any;
	readonly server: IImperiumServer;
} & T;

export type ImperiumEnvironmentVar = string | number | boolean | ImperiumEnvironment;
export type ImperiumEnvironment = {[key: string]: ImperiumEnvironmentVar | ImperiumEnvironmentVar[]};

export interface ImperiumRequest extends Request {
	contextManager: IContextManager;
}
export type ImperiumRequestHandler = (req: ImperiumRequest, res: Response, next: NextFunction) => void;

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
	addEnvironment(key: string, value: ImperiumEnvironmentVar): void;
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
