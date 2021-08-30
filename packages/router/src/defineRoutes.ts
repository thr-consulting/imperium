import debug from 'debug';
import {generatePath, RouteComponentProps, RouteProps} from 'react-router-dom';
import type {DefineRouteOptions, KeyedRouteRenderFns, KeyedRoutePathFns, KeyedRouteParamTypes} from './types';

const d = debug('imperium.router.defineRoutes');

export function defineRoutes<T extends DefineRouteOptions>(opts: T) {
	const to = {} as KeyedRoutePathFns<T>;
	const types = {} as KeyedRouteParamTypes<T>;

	Object.keys(opts).forEach(key => {
		// @ts-ignore
		to[key] = params => {
			// @ts-ignore
			return generatePath(opts[key].path, params);
		};
		// @ts-ignore
		types[key] = 'ERROR: Do not use route types as values';
	});

	return {
		to,
		types,
		renderRouteProps: (routeRenderFunctions: KeyedRouteRenderFns<T>): RouteProps[] => {
			return Object.keys(opts).map(key => {
				return {
					path: opts[key].path,
					exact: true,
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
