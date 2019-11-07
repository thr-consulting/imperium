import React from 'react';
import {Request, Response, NextFunction} from 'express';
import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import Context from './src/Context';
import ImperiumServer from './src';

export {Context, ImperiumServer};

export type ImperiumConnectorsMap = {[connectorName: string]: any};

export interface ImperiumConnectors {
	create(server: ImperiumServer): Promise<ImperiumConnectorsMap>;
	close(): Promise<void>;
}

export type ImperiumOptions = {[key: string]: any};

export type IModel = Model<Document> | DataLoader<string | Types.ObjectId, Document>;

export interface ModelsMap {
	[key: string]: IModel;
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
	resolvers?: (server: ImperiumServer) => {[key: string]: any};
	insecureSchema?: DocumentNode | DocumentNode[];
	insecureSchemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
	insecureResolvers?: {};
}

export type ImperiumServerModuleFunction = () => ImperiumServerModule;

export interface ImperiumServerOptions {
	connectors: ImperiumConnectors;
	serverModules?: ImperiumServerModuleFunction[];
	options?: () => {[key: string]: any};
}

export type InitialConfig = {[key: string]: any};
