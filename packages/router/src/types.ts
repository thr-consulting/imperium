/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ImperiumClientModule} from '@imperium/client';
import type {RouteComponentProps, RouteProps} from 'react-router-dom';

type ParametersFromAssertion<T extends readonly string[]> = {
	[key in T[number]]: string;
};

type RoutePathFn<T extends readonly string[] | undefined> = T extends readonly string[]
	? (params: ParametersFromAssertion<T>) => string
	: () => string;

type RouteRenderFn<T extends readonly string[] | undefined> = T extends readonly string[]
	? (params: ParametersFromAssertion<T>, rcp: RouteComponentProps<ParametersFromAssertion<T>>) => JSX.Element
	: (rcp: RouteComponentProps<never>) => JSX.Element;

type RouteParamsType<T extends readonly string[] | undefined> = T extends readonly string[] ? ParametersFromAssertion<T> : never;

interface RouteOptions extends Omit<RouteProps, 'render' | 'children' | 'component'> {
	params?: readonly string[];
}

export interface DefineRouteOptions {
	[key: string]: RouteOptions;
}

export type KeyedRoutePathFns<T extends DefineRouteOptions> = {
	[key in keyof T]: RoutePathFn<T[key]['params']>;
};

export type KeyedRouteRenderFns<T extends DefineRouteOptions> = {
	[key in keyof T]: RouteRenderFn<T[key]['params']>;
};

export type KeyedRouteParamTypes<T extends DefineRouteOptions> = {
	[key in keyof T]: RouteParamsType<T[key]['params']>;
};

export interface ImperiumRouterClientModule extends ImperiumClientModule {
	routeProps: RouteProps[];
}

export function isImperiumRouterClientModule(module: ImperiumClientModule): module is ImperiumRouterClientModule {
	const routeModule = module as ImperiumRouterClientModule;
	return routeModule.routeProps !== undefined;
}
