import debug from 'debug';
import type {ReactNode} from 'react';
import {generatePath, matchPath, type RouteObject} from 'react-router-dom';
import type {DefineRouteOptions, KeyedRouteMatchFns, KeyedRouteParamTypes, KeyedRoutePathFns, KeyedRouteRenderFns, Routes} from './types';

const d = debug('imperium.router.defineRoutes');

export type ExtendedRouteObject = RouteObject & {
	isPublic?: boolean;
};

export function defineRoutes<T extends DefineRouteOptions>(opts: T): Routes<T> {
	const to = {} as KeyedRoutePathFns<T>;
	const types = {} as KeyedRouteParamTypes<T>;
	const match = {} as KeyedRouteMatchFns<T>;

	Object.keys(opts).forEach(key => {
		// @ts-ignore
		to[key] = (params: Record<string, string> | null) => {
			const pathPattern = opts[key].path;
			if (!pathPattern) return '/404';

			const requiredParams = opts[key].params || [];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			const paramsAreGood = requiredParams.every(paramKey => params && params[paramKey] !== undefined && params[paramKey] !== '');

			if (requiredParams.length > 0 && !paramsAreGood) {
				return '/404';
			}

			return generatePath(pathPattern, params || {});
		};

		// @ts-ignore
		types[key] = 'ERROR: Do not use route types as values';

		// @ts-ignore
		match[key] = (pathname: string) => {
			const pathPattern = opts[key].path;
			if (!pathPattern) return null;

			const ret = matchPath({path: pathPattern, end: true}, pathname);
			return ret ? (ret.params as any) : null;
		};
	});

	return {
		to,
		match,
		types,
		renderRouteProps: (routeRenderFunctions: KeyedRouteRenderFns<T>): ExtendedRouteObject[] => {
			return Object.keys(opts).map(key => {
				const routeOpt = opts[key];
				const renderFn = routeRenderFunctions[key as keyof T] as (params: any) => ReactNode;

				return {
					path: routeOpt.path,
					isPublic: routeOpt.isPublic || false,
					element: renderFn(routeOpt.params ? {} : null),
				};
			});
		},
	};
}
