import debug from 'debug';
import type {ComponentClass, ReactNode} from 'react';
import {Routes, Route, type RouteObject} from 'react-router-dom';

const d = debug('imperium.router.components.ContentRouter');

export type ExtendedRouteProps = RouteObject & {
	isPublic?: boolean;
};

interface ContentRouterProps {
	routeDefaults?: Omit<ExtendedRouteProps, 'element' | 'children'>;
	routes?: ExtendedRouteProps[];
	errorBoundary?: ComponentClass<{children: ReactNode}>;
	isAuthenticated?: boolean;
	renderOnUnauth?: () => ReactNode;
}

export function ContentRouter(props: ContentRouterProps) {
	const {routeDefaults, errorBoundary, routes = [], isAuthenticated, renderOnUnauth} = props;

	const childs = (
		<Routes>
			{routes.map((route, index) => {
				const mergedRoute = {
					...(routeDefaults || {}),
					...route,
				} as ExtendedRouteProps;

				const key = typeof mergedRoute.path === 'string' ? mergedRoute.path : `route-${index}`;
				const {isPublic, element, path, caseSensitive, index: isIndex, children, ...rest} = mergedRoute;

				// Resolve active element without nested ternaries
				let activeElement = element;
				if (!isPublic && !isAuthenticated) {
					activeElement = renderOnUnauth ? renderOnUnauth() : <div>Not authenticated</div>;
				}

				return (
					<Route key={key} path={path} index={isIndex as any} caseSensitive={caseSensitive} element={activeElement} {...(rest as any)}>
						{children as ReactNode}
					</Route>
				);
			})}
		</Routes>
	);

	if (errorBoundary) {
		const ErrorBoundary = errorBoundary;
		return <ErrorBoundary>{childs}</ErrorBoundary>;
	}

	return childs;
}
