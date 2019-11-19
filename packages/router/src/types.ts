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
	// Reroute
	permissions?: string | string[];
	redirect?: boolean;
}

export interface ImperiumRouterClientModule {
	routes?: ImperiumRoute[];
}
