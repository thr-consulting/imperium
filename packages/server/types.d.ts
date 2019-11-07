import React from 'react';
import {Request, Response, NextFunction} from 'express';
import DataLoader from 'dataloader';
import {Document, Model, Types} from 'mongoose';
import {DocumentNode} from 'graphql';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import {RouteProps} from 'react-router-dom';
import Context from './src/server/Context';
import ImperiumServer from './src/server';
import ImperiumClient from './src/client';

export {Context, ImperiumServer, ImperiumClient};

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
export type InitialState = {[key: string]: any} | null | void;
export type RootProps = {[key: string]: any};
export type Hoc = (WrappedComponent: React.ComponentType<any>) => React.Component;
export type HocCreator = (client: ImperiumClient) => Hoc;

export interface ImperiumClientModule {
	name: string;
	initialState?: (initialConfig: InitialConfig, initialState: InitialState) => InitialState;
	startup?: (client: ImperiumClient) => RootProps | void;
	routes?: ImperiumRoute[];
	hocs?: HocCreator[];
}

export type ImperiumClientModuleFunction = () => ImperiumClientModule;

export interface ImperiumClientOptions {
	clientModules?: ImperiumClientModuleFunction[];
	rootComponent: React.Component;
	rootProps?: {[key: string]: any};
}

interface RouteContentProps {
	route: ImperiumRoute;
}

export interface ImperiumRoute extends RouteProps {
	layout?: React.ComponentType<RouteContentProps>;
	content?: React.ComponentType<RouteContentProps>;
	statusbar?: React.ComponentType<RouteContentProps>;
	sidebar?: React.ComponentType<RouteContentProps>;
	menu?: React.ComponentType<RouteContentProps>;
	footer?: React.ComponentType<RouteContentProps>;
	// TODO remove these in favor of extending @thx/router Reroute props
	permissions?: string | string[];
	redirect?: boolean;
	// Portal props
	key?: string;
	portal?: React.ComponentType<{
		route: ImperiumRoute;
		routeKey: string;
		restoreRoute: (routeKey: string) => void;
	}>;
}
