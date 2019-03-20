// @flow

/* eslint-disable react/no-children-prop, react/forbid-prop-types */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import debug from 'debug';
import {parse, stringify} from 'query-string';
import Unauthorized from '../Unauthorized';

const d = debug('imperium:core:Reroute');

type Props = {
	component?: any,
	render?: any,
	children?: any,
	permissions?: string | string[],
	redirect?: boolean,
	checkPermissions?: () => {},
	location: {
		search: string,
		pathname: string,
	},
};

export default function Reroute({component, render, children, permissions, redirect, checkPermissions, ...rest}: Props) {
	// If an AuthContext is not supplied, we ignore permissions.
	if (!checkPermissions) {
		d('No way to check permissions provided, ignoring permissions');
		if (component) return <Route {...rest} component={component}/>;
		if (render) return <Route {...rest} render={render}/>;
		if (children) return <Route {...rest} children={children}/>;
		return null;
	}

	const {isAuthenticated, isAuthorized} = checkPermissions(permissions);

	d(`Permissions required: ${String(permissions)}, isAuthenticated: ${isAuthenticated}, isAuthorized: ${String(isAuthorized)}, willRedirect: ${String(redirect)}, Path: ${rest.path}`);

	// If redirect is true
	if (redirect) {
		return (
			<Route
				{...rest}
				render={props => {
					// Render component if logged in and have permissions.
					if (isAuthenticated && isAuthorized) {
						if (component) return <Route {...rest} component={component}/>;
						if (render) return <Route {...rest} render={render}/>;
						if (children) return <Route {...rest} children={children}/>;
						return null;
					}

					// Render unauthorized if logged in but no permissions.
					if (isAuthenticated && !isAuthorized) return <Unauthorized/>;

					// Render nothing if we already display the login
					const currentQuery = parse(props.location.search);
					if (currentQuery.login) {
						return null; // This is what's displayed underneath the login screen
					}

					return (
						<Redirect
							to={{
								pathname: props.location.pathname,
								search: stringify({...currentQuery, login: true}),
							}}
						/>
					);
				}}
			/>
		);
	}

	// Not redirecting, just render null if not logged in or not authorized
	if (permissions && isAuthenticated && isAuthorized && component) return <Route {...rest} component={component}/>;
	if (permissions && isAuthenticated && isAuthorized && render) return <Route {...rest} render={render}/>;
	if (permissions && isAuthenticated && isAuthorized && children) return <Route {...rest} children={children}/>;
	if (permissions) return <Unauthorized/>;
	if (component) return <Route {...rest} component={component}/>;
	if (render) return <Route {...rest} render={render}/>;
	if (children) return <Route {...rest} children={children}/>;
	return null;
}
