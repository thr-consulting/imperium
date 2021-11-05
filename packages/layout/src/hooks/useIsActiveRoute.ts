import type {RouteProps} from 'react-router-dom';
import {useRouteMatch} from 'react-router';
import type {Data} from '../types';
import {isRouteItem} from '../commonItems';

export function useIsActiveRoute(data: Data, item?: any) {
	// Determine if the current route matches the to route to see if the link is active
	const routeMatchObject: RouteProps = {};
	if (item && isRouteItem(item)) {
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
