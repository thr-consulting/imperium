import debug from 'debug';
import React, {ReactNode} from 'react';
import {Switch, Route, RouteProps} from 'react-router-dom';

const d = debug('imperium.router.components.ContentRouter');

interface ContentRouterProps {
	routeDefaults?: Omit<RouteProps, 'render' | 'component' | 'children'>;
	routes?: RouteProps[];
	errorBoundary?: React.ComponentClass<{children: ReactNode}>;
}

export function ContentRouter(props: ContentRouterProps) {
	const {routeDefaults, errorBoundary} = props;

	const childs = (
		<Switch>
			{props.routes?.map(route => {
				// Apply default route options and then apply specific route options
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
