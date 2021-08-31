import debug from 'debug';
import {generatePath, matchPath, RouteComponentProps, RouteProps} from 'react-router-dom';
import type {KeyedRouteMatchFns, DefineRouteOptions, KeyedRouteRenderFns, KeyedRoutePathFns, KeyedRouteParamTypes} from './types';

const d = debug('imperium.router.defineRoutes');

export function defineRoutes<T extends DefineRouteOptions>(opts: T) {
	const to = {} as KeyedRoutePathFns<T>;
	const types = {} as KeyedRouteParamTypes<T>;
	const match = {} as KeyedRouteMatchFns<T>;

	Object.keys(opts).forEach(key => {
		// @ts-ignore
		to[key] = params => {
			if (params === null) return '/404';
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
						if (opts[key]) {
							// const propsFn = opts[key].params;
							// if (propsFn) {
							// 	return routeRenderFunctions[key](propsFn(rcp.match.params), rcp);
							// }
						}
						// @ts-ignore
						return routeRenderFunctions[key](null, rcp);
					},
				};
			});
		},
	};
}
