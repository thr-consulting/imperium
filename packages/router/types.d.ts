import {ImperiumRoute} from '@imperium/core';

export interface RouteDirectorProps {
	routeDefaults: {[key: string]: any};
	rootRoute: ImperiumRoute;
	routes?: ImperiumRoute[];
}

declare function RouteDirector(props: RouteDirectorProps): JSX.Element;
