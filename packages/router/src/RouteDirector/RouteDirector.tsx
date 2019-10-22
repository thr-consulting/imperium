import React from 'react';
import debug from 'debug';
import {Switch, Route} from 'react-router-dom';
import {ImperiumRoute} from '@imperium/core';
import RouteErrorBoundary from './RouteErrorBoundary';
import {RouteDirectorProps} from '../../types';

const d = debug('imperium.router.RouteDirector');

export default function RouteDirector(props: RouteDirectorProps) {
	const {routeDefaults} = props;
	let routes = [props.rootRoute];
	if (props.routes) {
		routes = routes.concat(props.routes);
	}

	return (
		<Switch>
			{routes.map((route, i) => {
				// Apply default route options and then apply specific route options
				const routeProps: ImperiumRoute = {...(routeDefaults || {}), ...route};

				return (
					<Route
						key={i}
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
