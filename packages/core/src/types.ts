import {RouteComponentProps} from 'react-router-dom';
import {Application} from 'express';

export interface Connectors {
	create: () => {},
	close: () => void,
}

export interface ServerModule {
	models?: string,
	schema?: string,
	resolvers?: string,
	endpoints?: string,
}

export interface EndpointParameters {
	app: Application,
	connectors?: Connectors,
	modules: ServerModule[],
	middleware?: any,
}

interface RouteContentProps {
	route: ImperiumRoute,
}

export interface ImperiumRoute extends RouteComponentProps {
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
	key: string,
	portal?: React.ComponentType<{ route: ImperiumRoute, routeKey: string }>,
}

export interface ClientModule {
	startup?: (initialConfig: {}, initialState: {}) => {},
	routes?: ImperiumRoute[],
}
