/**
 * A simple hook, that doesn't return anything. If used together with a route match function, the returned route parameters are passed in.
 */
export type DataHook = (routeParams?: any) => void;
/**
 * A route match function that can be used by data hooks. Usually is the @imperium/router `routes.match.x()` functions.
 */
export type DataHookRouteMatchFn = (route: string) => any;
/**
 * An object that can specify one or more data hooks that can receive route parameters from one or more route match functions.
 */
export type DataHookRoute = {
	routeMatch: DataHookRouteMatchFn | DataHookRouteMatchFn[];
	dataHook: DataHook | DataHook[];
};
/**
 * A datahook can either be a simple hook, or one or more hooks dependent on one or more route match functions.
 */
export type DataHookItem = DataHook | DataHookRoute;
