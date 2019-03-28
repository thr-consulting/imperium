// @flow

import React from 'react';
import debug from 'debug';
import {withRouter} from 'react-router-dom';
import {parse, stringify} from 'query-string';
import SwitchWithError from '../SwitchWithError';
import Reroute from '../Reroute/Reroute';

const d = debug('imperium.core.RouteDirector');

function NoAuthContextConsumer({children}) {
	return children({checkPermissions: null});
}

type RouteType = {
	path: string,
	exact?: boolean,
	strict?: boolean,
	redirect?: boolean,
	permissions?: string | string[],
	layout?: Element<*>,
};

type Props = {
	routes: RouteType[],
	defaults?: {
		exact?: boolean,
		strict?: boolean,
		redirect?: boolean,
		permissions?: string | string[],
		layout?: Element<*>,
	},
	location: {
		search: string,
	},
	history: {
		push: () => {},
	},
	onRouteChange?: () => {},
	AuthContextConsumer?: any,
};

/**
 * The RouteDirector renders main routes, usually in a layout, based off of route objects.
 * @param props
 * @return {*}
 * @constructor
 */
function RouteDirector(props: Props) {
	const {location: {pathname, search, hash}, history, routes, defaults, AuthContextConsumer} = props;

	d(`Rendering RouteDirector: ${pathname}${search}${hash}`);

	const currentQuery = parse(search);

	const AuthContextConsumerComponent = AuthContextConsumer || NoAuthContextConsumer;

	return (
		<AuthContextConsumerComponent>
			{({checkPermissions}) => (
				<div>
					<SwitchWithError>
						{routes.map(route => {
							// Apply default route options and then apply specific route options
							const routeProps = Object.assign({}, defaults || {}, route);

							// If the route is a portal route, don't render it here
							if (routeProps.portal) return null;

							// Render the route content in a Reroute, which checks for permissions
							return (
								<Reroute
									key={routeProps.path}
									render={rrProps => {
										d(`Rendering route: ${routeProps.path}`);
										if (routeProps.layout) {
											return <routeProps.layout route={routeProps} {...rrProps}/>;
										}
										if (routeProps.content) {
											return <routeProps.content route={routeProps} {...rrProps}/>;
										}
										return null;
									}}
									checkPermissions={checkPermissions}
									{...routeProps}
								/>
							);
						})}
					</SwitchWithError>
					{
						routes.map(route => {
							// If the route is not a portal route or if the current key isn't present, don't render it here
							if (!route.portal || !currentQuery[route.key]) return null;
							d('Rendering a portal', route.key);
							return (
								<route.portal
									key={route.key}
									routeKey={route.key}
									restoreRoute={routeKey => {
										d('Removing portal route key', routeKey);
										delete currentQuery[routeKey];
										history.push({
											...props.location,
											search: stringify(currentQuery),
										});
									}}
									{...route}
								/>
							);
						})
					}
				</div>
			)}
		</AuthContextConsumerComponent>
	);
}

export default withRouter(RouteDirector);
