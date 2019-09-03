import {Request, Response, NextFunction} from 'express';
import DataLoader from 'dataloader';
import {Document, Model, Types} from 'mongoose';
import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import Context from './src/server/Context';
import ImperiumServer from './src/server';

export {Context};

export type ImperiumConnectorsMap = {[connectorName: string]: any};

export interface ImperiumConnectors {
	create(): Promise<ImperiumConnectorsMap>;
	close(): Promise<void>;
}

export type ImperiumOptions = {[key: string]: any};

export interface ModelsMap {
	[key: string]: DataLoader<string | Types.ObjectId, Document> | Model<Document>;
}

export interface MiddlewareOptions {
	options: ImperiumOptions;
}

export interface ModelsOptions {
	options: ImperiumOptions;
	connectors: ImperiumConnectorsMap;
	context: Context;
}

export interface StartupOptions {
	options: ImperiumOptions;
	context: Context;
}

export interface ImperiumRequest extends Request {
	context: Context;
}

export type ImperiumRequestHandler = (req: ImperiumRequest, res: Response, next: NextFunction) => void;

export interface MiddlewareMap {
	[key: string]: () => ImperiumRequestHandler;
}

export interface ImperiumServerModule {
	// @imperium/core
	name: string;
	options?: () => {[key: string]: any};
	middleware?: (server: ImperiumServer) => MiddlewareMap;
	endpoints?: (server: ImperiumServer) => void;
	models?: (options: ModelsOptions) => ModelsMap;
	startup?: (server: ImperiumServer) => Promise<{[key: string]: any}>;
	// @imperium/graphql
	schema?: DocumentNode | DocumentNode[];
	schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
	resolvers?: {};
	insecureSchema?: DocumentNode | DocumentNode[];
	insecureSchemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
	insecureResolvers?: {};
}

export interface ImperiumServerOptions {
	connectors: ImperiumConnectorsMap;
	serverModules?: ImperiumServerModuleFunction[];
	options?: () => {[key: string]: any};
}

export type ImperiumServerModuleFunction = () => ImperiumServerModule;

export interface ImperiumClientModule {
	name: string;
}

export type ImperiumClientModuleFunction = () => ImperiumClientModule;

export interface ImperiumClientOptions {
	clientModules: ImperiumClientModuleFunction[];
}
