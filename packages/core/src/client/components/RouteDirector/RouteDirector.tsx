import React from 'react';
import debug from 'debug';
import {withRouter} from 'react-router-dom';
import {parse, stringify} from 'query-string';
import {ImperiumRoute} from '../../../../types';

const d = debug('imperium.core.RouteDirector');

interface Props {
	routes: ImperiumRoute[];
	defaults?: {
		exact?: boolean;
		strict?: boolean;
		redirect?: boolean;
		permissions?: string | string[];
		layout?: React.ComponentType;
		portal: React.ComponentType;
	};
	location: {
		pathname: string;
		search: string;
		hash: string;
	};
	history: {
		push: (pushObj: object) => {};
	};
	onRouteChange?: () => {};
	AuthContextConsumer?: any;
}

interface AuthContextConsumerRenderProp {
	checkPermissions?: () => void;
}

function NoAuthContextConsumer({
	children,
}: {
	children: (param: AuthContextConsumerRenderProp) => JSX.Element;
}): JSX.Element {
	return children({checkPermissions: undefined});
}

/**
 * The RouteDirector renders main routes, usually in a layout, based off of route objects.
 * @param props
 * @return {*}
 * @constructor
 */
function RouteDirector(props: Props): JSX.Element {
	const {
		location: {pathname, search, hash},
		history,
		routes,
		defaults,
		AuthContextConsumer,
	} = props;

	d(`Rendering RouteDirector: ${pathname}${search}${hash}`);

	const currentQuery = parse(search);

	const AuthContextConsumerComponent = AuthContextConsumer || NoAuthContextConsumer;

	return (
		<AuthContextConsumerComponent>
			{({checkPermissions}: AuthContextConsumerRenderProp) => (
				<div>
					<SwitchWithError>
						{routes.map(route => {
							// Apply default route options and then apply specific route options
							const routeProps: ImperiumRoute = Object.assign({}, defaults || {}, route);

							// If the route is a portal route, don't render it here
							if (routeProps.portal) return null;

							// Render the route content in a Reroute, which checks for permissions
							return (
								<Reroute
									key={routeProps.path}
									render={(rrProps: ImperiumRoute) => {
										d(`Rendering route: ${routeProps.path}`);
										if (routeProps.layout) {
											return <routeProps.layout route={routeProps} {...rrProps} />;
										}
										if (routeProps.content) {
											return <routeProps.content route={routeProps} {...rrProps} />;
										}
										return null;
									}}
									checkPermissions={checkPermissions}
									{...routeProps}
								/>
							);
						})}
					</SwitchWithError>
					{routes.map(Route => {
						// If the route is not a portal route or if the current key isn't present, don't render it here
						if (!Route.portal || !Route.key || !currentQuery[Route.key]) return null;
						d('Rendering a portal', Route.key);
						return (
							<Route.portal
								key={Route.key}
								routeKey={Route.key}
								restoreRoute={(routeKey: string) => {
									d('Removing portal route key', routeKey);
									// @ts-ignore
									delete currentQuery[routeKey];
									history.push({
										...props.location,
										search: stringify(currentQuery),
									});
								}}
								route={Route}
								{...Route}
							/>
						);
					})}
				</div>
			)}
		</AuthContextConsumerComponent>
	);
}

// @ts-ignore
export default withRouter(RouteDirector);
