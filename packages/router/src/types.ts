import type {ImperiumClientModule} from '@imperium/client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {RouteComponentProps, RouteProps} from 'react-router-dom';

interface RouteOptions extends Omit<RouteProps, 'render' | 'children' | 'component'> {
	props?: (...params: any) => any;
}

type OptionalFunction = undefined | ((...args: any) => any);
type EmptyFunctionIfUndefined<T extends OptionalFunction> = T extends undefined ? () => void : T;
type ParametersOfFunction<T extends OptionalFunction> = Parameters<EmptyFunctionIfUndefined<T>>;
type RoutePathRenderFn<Params extends any[]> = (...params: Params) => string;
type RoutePathRenderFnOrDefaults<T extends OptionalFunction> = RoutePathRenderFn<ParametersOfFunction<T>>;

export interface DefineRouteOptions {
	[key: string]: RouteOptions;
}

export type DynamicRoutePathRenderers<DRO extends DefineRouteOptions> = {
	[key in keyof DRO]: RoutePathRenderFnOrDefaults<DRO[key]['props']>;
};

export type RouteRenderFns<T extends DefineRouteOptions> = {
	[key in keyof T]: (props: ParametersOfFunction<T[key]['props']>, rcp: RouteComponentProps) => JSX.Element;
};

export interface ImperiumRouterClientModule extends ImperiumClientModule {
	routes: RouteProps[];
}

export function isImperiumRouterClientModule(module: ImperiumClientModule): module is ImperiumRouterClientModule {
	const routeModule = module as ImperiumRouterClientModule;
	return routeModule.routes !== undefined;
}
