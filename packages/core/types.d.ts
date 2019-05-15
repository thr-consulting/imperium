import React from 'react';
import {RouteProps} from 'react-router-dom';
import {Application, RequestHandler, NextFunction, Request, Response} from 'express';
import DataLoader from 'dataloader';
import {DocumentNode} from 'graphql';
import {Document, Model, Types} from 'mongoose';
import Context from './src/server/middleware/Context';

export {default as Context} from './src/server/middleware/Context';

interface RouteContentProps {
	route: ImperiumRoute,
}

export interface ImperiumRoute extends RouteProps {
	layout?: React.ComponentType<RouteContentProps>,
	content?: React.ComponentType<RouteContentProps>,
	statusbar?: React.ComponentType<RouteContentProps>,
	sidebar?: React.ComponentType<RouteContentProps>,
	menu?: React.ComponentType<RouteContentProps>,
	footer?: React.ComponentType<RouteContentProps>,
	// TODO remove these in favor of extending @thx/router Reroute props
	permissions?: string | string[],
	redirect?: boolean,
	// Portal props
	key?: string,
	portal?: React.ComponentType<{
		route: ImperiumRoute,
		routeKey: string,
		restoreRoute: (routeKey: string) => void,
	}>,
}

export type InitialConfig = Record<string, any>;
export type InitialState = Record<string, any> | null | void;
export type Fragments = Record<string, any>;
export type StartupData = Record<string, any>;

export interface ClientModule {
	startup?: (initialConfig: InitialConfig, initialState: InitialState) => {} | void,
	routes?: ImperiumRoute[],
	fragments?: Fragments,
}

export interface EndpointOptions {
	app: Application,
	connectors?: Connectors,
	modules: ServerModule[],
	middleware?: any,
}

export interface Models {
	[key: string]: DataLoader<string | Types.ObjectId, Document> | Model<Document>,
}

export interface ServerModule {
	schema?: DocumentNode | DocumentNode[],
	resolvers?: {},
	models?: () => Models,
	endpoints?: (options: EndpointOptions) => void,
	startup?: (context: Context) => Promise<StartupData>,
	initialConfig?: () => InitialConfig,
	pre?: (initialConfig: InitialConfig) => InitialState,
}

export interface Connectors {
	create: () => {},
	close: () => void,
}

export interface ImperiumRequest extends Request {
	context: Context,
}

export interface ImperiumRequestHandler extends RequestHandler {
	(req: ImperiumRequest, res: Response | null, next: NextFunction): any,
}

export type ServerModuleFunc = (connectors: Connectors[], context: Context) => ServerModule;

// export interface Context {
// 	addModule: (moduleFunc: ServerModuleFunc) => void,
// 	getModel: (name: string) => Model,
// 	models: Record<string, Model>,
// 	auth: any,
// 	connectors: Connectors[],
// }
