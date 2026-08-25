import {useMatch} from 'react-router-dom';
import {isRouteItem} from '../commonItems';
import type {Data} from '../types';

export function useIsActiveRoute(data: Data, item?: any) {
	let targetPath: string | undefined;

	if (item && isRouteItem(item)) {
		if (typeof item.to === 'string') {
			targetPath = item.to;
		} else if (typeof item.to === 'function') {
			targetPath = item.to(data);
		}
	}

	// useMatch returns a match object if the current URL matches targetPath, or null otherwise.
	// Pass end: item.exact !== false to emulate v5 'exact' behavior if needed.
	const routeMatch = useMatch({
		path: targetPath || '',
		end: item?.exact !== false,
		caseSensitive: item?.sensitive,
	});

	// If no targetPath was derived, return false
	if (!targetPath) {
		return false;
	}

	return routeMatch !== null;
}
