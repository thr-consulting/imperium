/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ImperiumClientModule} from '@imperium/client';
import type {ReactNode} from 'react';
import {type RouteObject} from 'react-router-dom';

export type ParametersFromAssertion<T extends readonly string[]> = {
	[key in T[number]]: string;
};

type RoutePathFn<T extends readonly string[] | undefined> = T extends readonly string[]
	? (params: ParametersFromAssertion<T> | null) => string
	: () => string;

type RouteRenderFn<T extends readonly string[] | undefined> = T extends readonly string[]
	? (params: ParametersFromAssertion<T>) => ReactNode
	: (params: null) => ReactNode;

type RouteParamsType<T extends readonly string[] | undefined> = T extends readonly string[] ? ParametersFromAssertion<T> : never;

export interface RouteOptions extends Omit<RouteObject, 'element' | 'children'> {
	params?: readonly string[];
	isPublic?: boolean;
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

export type KeyedRouteMatchFns<T extends DefineRouteOptions> = {
	[key in keyof T]: (pathname: string) => RouteParamsType<T[key]['params']> | null;
};

export interface ImperiumRouterClientModule extends ImperiumClientModule {
	routeProps?: (RouteObject & {isPublic?: boolean})[];
}

export function isImperiumRouterClientModule(module: ImperiumClientModule): module is ImperiumRouterClientModule {
	const routeModule = module as ImperiumRouterClientModule;
	return routeModule.routeProps !== undefined;
}

export interface Routes<T extends DefineRouteOptions> {
	types: KeyedRouteParamTypes<T>;
	match: KeyedRouteMatchFns<T>;
	to: KeyedRoutePathFns<T>;
	renderRouteProps: (routeRenderFunctions: KeyedRouteRenderFns<T>) => (RouteObject & {isPublic?: boolean})[];
}
