import React from 'react';
import {RouteProps} from 'react-router-dom';

export type ImperiumEnvironmentVar = string | number | boolean | ImperiumEnvironment;
export type ImperiumEnvironment = {[key: string]: ImperiumEnvironmentVar | ImperiumEnvironmentVar[]};

export type GlobalConst = {[key: string]: string | number | boolean};
export type RootProps = {[key: string]: any};
export type Hoc = (WrappedComponent: React.ComponentType<any>) => React.Component;
export type HocCreator = (client: IImperiumClient) => Hoc;

export interface ImperiumClientModule {
	name: string;
	environment?: (globalConst: GlobalConst, currentEnvironment: ImperiumEnvironment) => Promise<ImperiumEnvironment>;
	startup?: (client: IImperiumClient) => RootProps | void;
	routes?: ImperiumRoute[];
	hocs?: HocCreator[];
}

export type ImperiumClientModuleFunction = () => ImperiumClientModule;

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

export interface IImperiumClient {
	start(): Promise<void>;
	renderRoot(clientModules: ImperiumClientModule[], rootComponent: React.Component): void;
	readonly environment: ImperiumEnvironment;
	readonly globalConst: GlobalConst;
}
