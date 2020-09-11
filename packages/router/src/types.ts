import type {RouteProps} from 'react-router-dom';
import type {ImperiumClientModule} from '@imperium/client';

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
}

export interface ImperiumRouterClientModule extends ImperiumClientModule {
	routes: ImperiumRoute[];
}

export function isImperiumRouterClientModule(value: ImperiumClientModule): value is ImperiumRouterClientModule {
	return (value as ImperiumRouterClientModule).routes !== undefined;
}
