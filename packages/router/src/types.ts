import type {ImperiumClientModule} from '@imperium/client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {RouteProps} from 'react-router-dom';

type OptionalArgTuple<T> = T extends undefined ? [] : [T];

export interface RouteOptions extends Omit<RouteProps, 'render' | 'children' | 'component'> {
	render: (params: any) => JSX.Element;
}

export interface CreateRouteSliceOptions {
	[key: string]: RouteOptions;
}

export type RoutePathRenderFn<A> = (...params: OptionalArgTuple<A>) => string;

export type DynamicRoutePathRenderers<T extends CreateRouteSliceOptions> = {
	[key in keyof T]: RoutePathRenderFn<Parameters<T[key]['render']>[0]>;
};

export interface RouteSlice<T extends CreateRouteSliceOptions> {
	to: DynamicRoutePathRenderers<T>;
	routes: RouteProps[];
}

export interface ImperiumRouterClientModule extends ImperiumClientModule {
	routes: RouteSlice<any>;
}

export function isImperiumRouterClientModule(module: ImperiumClientModule): module is ImperiumRouterClientModule {
	const routeModule = module as ImperiumRouterClientModule;
	return routeModule.routes !== undefined;
}
