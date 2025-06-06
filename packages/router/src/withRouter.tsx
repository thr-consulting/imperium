import type {Hoc, ImperiumClient} from '@imperium/client';
import debug from 'debug';
import type {ComponentType} from 'react';
import {BrowserRouter, type RouteProps} from 'react-router-dom';
import {ScrollToTop} from './components/ScrollToTop';
import {isImperiumRouterClientModule} from './types';

const d = debug('imperium.router.withRouter');

export default function withRouter(client: ImperiumClient): Hoc {
	// Load routes
	d('Loading routes');
	const routes = client.modules.reduce((memo, module) => {
		if (isImperiumRouterClientModule(module)) {
			return [...memo, ...module.routeProps];
		}
		return memo;
	}, [] as RouteProps[]);

	return function routerHoc(WrappedComponent: ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithRouter(props: any) {
			return (
				<BrowserRouter>
					<ScrollToTop />
					<WrappedComponent {...props} routes={routes} />
				</BrowserRouter>
			);
		}

		ComponentWithRouter.displayName = `withRouter(${displayName}`;
		return ComponentWithRouter;
	};
}
