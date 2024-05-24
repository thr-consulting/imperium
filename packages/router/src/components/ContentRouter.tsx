import debug from 'debug';
import type {ComponentClass, ReactNode} from 'react';
import {Switch, Route, RouteProps} from 'react-router-dom';

const d = debug('imperium.router.components.ContentRouter');

interface ContentRouterProps {
	routeDefaults?: Omit<RouteProps, 'render' | 'component' | 'children'>;
	routes?: RouteProps[];
	errorBoundary?: ComponentClass<{children: ReactNode}>;
	isAuthenticated?: boolean; // Pass true if the user is authenticated, otherwise assumes not authenticated
	renderOnUnauth?: () => ReactNode;
}

export function ContentRouter(props: ContentRouterProps) {
	const {routeDefaults, errorBoundary} = props;

	const childs = (
		<Switch>
			{props.routes?.map(route => {
				// Apply default route options and then apply specific route options
				// @ts-ignore
				if (!route.isPublic && !props.isAuthenticated) {
					const routeProps: RouteProps = {...(routeDefaults || {}), ...route};
					routeProps.render = props.renderOnUnauth
						? props.renderOnUnauth
						: () => {
								return <div>Not authenticated</div>;
						  };
					routeProps.children = undefined;
					routeProps.component = undefined;
					return <Route key={`${route.path}`} {...routeProps} />;
				}

				const routeProps: RouteProps = {...(routeDefaults || {}), ...route};
				return <Route key={`${route.path}`} {...routeProps} />;
			})}
		</Switch>
	);

	if (errorBoundary) {
		const ErrorBoundary = errorBoundary;
		return <ErrorBoundary>{childs}</ErrorBoundary>;
	}

	return childs;
}
