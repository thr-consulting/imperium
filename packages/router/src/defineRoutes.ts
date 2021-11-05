import debug from 'debug';
import {generatePath, matchPath, RouteComponentProps, RouteProps} from 'react-router-dom';
import type {DefineRouteOptions, KeyedRouteMatchFns, KeyedRouteParamTypes, KeyedRoutePathFns, KeyedRouteRenderFns, Routes} from './types';

const d = debug('imperium.router.defineRoutes');

/*
	Defines routes from a definition object.

	Each routes requires it's own string key and contains normal React-Router options,
	less the render/children/component, plus a params array, if needed.

	The return object provides the following:
	- to: functions for creating route to strings
	- match: a function that takes a route string and attempts to match it to the route, returning it's parameters
	- types: when used with `typeof`, gives a type of the parameters object for the route, or `never` if no parameters.
	- renderRouteProps: a function that can be used to link components to routes for rendering
*/

export function defineRoutes<T extends DefineRouteOptions>(opts: T): Routes<T> {
	const to = {} as KeyedRoutePathFns<T>;
	const types = {} as KeyedRouteParamTypes<T>;
	const match = {} as KeyedRouteMatchFns<T>;

	Object.keys(opts).forEach(key => {
		// @ts-ignore
		to[key] = params => {
			const paramsAreGood = (opts[key].params || []).reduce((memo, v) => {
				if (!params || !params[v] || params[v] === '') return false;
				return memo;
			}, true);
			if (!paramsAreGood) return '/404';
			// @ts-ignore
			return generatePath(opts[key].path, params);
		};
		// @ts-ignore
		types[key] = 'ERROR: Do not use route types as values';
		// @ts-ignore
		match[key] = (s: string) => {
			const ret = matchPath(s, opts[key]);
			if (ret) return ret.params;
			return null;
		};
	});

	return {
		to,
		match,
		types,
		renderRouteProps: (routeRenderFunctions: KeyedRouteRenderFns<T>): RouteProps[] => {
			return Object.keys(opts).map(key => {
				return {
					path: opts[key].path,
					exact: opts[key].exact !== false,
					sensitive: opts[key].sensitive,
					strict: opts[key].strict,
					render: (rcp: RouteComponentProps) => {
						if (opts[key].params) {
							// @ts-ignore
							return routeRenderFunctions[key](rcp.match.params, rcp);
						}

						// @ts-ignore
						return routeRenderFunctions[key](null, rcp);
					},
				};
			});
		},
	};
}
