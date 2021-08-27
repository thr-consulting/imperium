import debug from 'debug';
import {generatePath, RouteComponentProps, RouteProps} from 'react-router-dom';
import type {DefineRouteOptions, DynamicRoutePathRenderers, RouteRenderFns} from './types';

const d = debug('imperium.router.defineRoutes');

export function defineRoutes<T extends DefineRouteOptions>(opts: T) {
	const renderers = {} as DynamicRoutePathRenderers<T>;

	Object.keys(opts).forEach(key => {
		// @ts-ignore
		renderers[key] = params => {
			// @ts-ignore
			return generatePath(opts[key].path, params);
		};
	});

	return {
		to: renderers,
		renderRoutes: (routeRenderFunctions: RouteRenderFns<T>): RouteProps[] => {
			return Object.keys(opts).map(key => {
				return {
					path: opts[key].path,
					exact: true,
					sensitive: opts[key].sensitive,
					strict: opts[key].strict,
					render: (rcp: RouteComponentProps) => {
						if (opts[key]) {
							const propsFn = opts[key].props;
							if (propsFn) {
								return routeRenderFunctions[key](propsFn(rcp.match.params), rcp);
							}
						}
						// @ts-ignore
						return routeRenderFunctions[key](null, rcp);
					},
				};
			});
		},
	};
}
