import {RouteProps, useRouteMatch} from 'react-router-dom';
import type {Data, Item} from '../types';
import {isRouteItem} from '../types';

export function useIsActiveRoute(item: Item, data: Data) {
	// Determine if the current route matches the to route to see if the link is active
	const routeMatchObject: RouteProps = {};
	if (isRouteItem(item)) {
		if (typeof item.to === 'string') {
			routeMatchObject.path = item.to;
		}
		if (typeof item.to === 'function') {
			routeMatchObject.path = item.to(data);
		}
		routeMatchObject.exact = item.exact !== false;
		routeMatchObject.sensitive = item.sensitive;
		routeMatchObject.strict = item.strict;
	}
	const routeMatch = useRouteMatch(routeMatchObject);
	return routeMatch !== null;
}
