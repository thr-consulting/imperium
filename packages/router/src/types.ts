import {RouteProps} from 'react-router-dom';

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
