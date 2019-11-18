import React from 'react';
import debug from 'debug';
import {Switch, Route} from 'react-router-dom';
import {ImperiumRoute} from '../types';
import RouteErrorBoundary from './RouteErrorBoundary';

const d = debug('imperium.router.RouteDirector');

interface RouteDirectorProps {
	routeDefaults?: ImperiumRoute;
	rootRoute: ImperiumRoute;
	routes?: ImperiumRoute[];
}

export default function RouteDirector(props: RouteDirectorProps) {
	const {routeDefaults} = props;
	let routes = [props.rootRoute];
	if (props.routes) {
		routes = routes.concat(props.routes);
	}

	return (
		<Switch>
			{routes.map(route => {
				// Apply default route options and then apply specific route options
				const routeProps: ImperiumRoute = {...(routeDefaults || {}), ...route};

				return (
					<Route
						key={`${route.path}`}
						render={(rProps: ImperiumRoute) => {
							d(`Rendering route: ${routeProps.path}`);
							if (routeProps.layout) {
								return (
									<RouteErrorBoundary>
										<routeProps.layout route={routeProps} {...rProps} />
									</RouteErrorBoundary>
								);
							}
							if (routeProps.content) {
								return (
									<RouteErrorBoundary>
										<routeProps.content route={routeProps} {...rProps} />
									</RouteErrorBoundary>
								);
							}
							return null;
						}}
						{...routeProps}
					/>
				);
			})}
		</Switch>
	);
}
