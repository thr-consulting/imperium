import React from 'react';
import {RouteProps} from 'react-router-dom';
import {Application, RequestHandler, NextFunction, Request, Response} from 'express';
import Context from './src/server/middleware/ContextMap';

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
	portal?: React.ComponentType<{ route: ImperiumRoute, routeKey: string }>,
}

export interface ClientModule {
	startup?: (initialConfig: {}, initialState: {}) => {} | void,
	routes?: ImperiumRoute[],
}

export interface EndpointOptions {
	app: Application,
	connectors?: Connectors,
	modules: ServerModule[],
	middleware?: any,
}

export interface ServerModule {
	models?: string,
	schema?: string,
	resolvers?: string,
	endpoints?: (options: EndpointOptions) => void,
	startup?: (context: Context) => Promise<any>,
	initialConfig: () => Record<string, any>,
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Model {
}
