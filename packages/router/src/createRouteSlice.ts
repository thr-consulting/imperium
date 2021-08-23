import {generatePath, RouteComponentProps, RouteProps} from 'react-router-dom';
import type {CreateRouteSliceOptions, DynamicRoutePathRenderers, RouteSlice} from './types';

export function createRouteSlice<T extends CreateRouteSliceOptions>(opts: T): RouteSlice<T> {
	const renderers = {} as DynamicRoutePathRenderers<T>;
	const routeProps = [] as RouteProps[];

	Object.keys(opts).forEach(key => {
		// @ts-ignore
		renderers[key] = params => generatePath(opts[key].path, params);

		// Build the RouteProps key
		routeProps.push({
			path: opts[key].path,
			exact: true,
			sensitive: opts[key].sensitive,
			strict: opts[key].strict,
			render: (props: RouteComponentProps) => opts[key].render(props.match.params),
		});
	});

	return {
		to: renderers,
		routes: routeProps,
	};
}
