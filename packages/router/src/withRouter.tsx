import React from 'react';
import debug from 'debug';
import {BrowserRouter} from 'react-router-dom';
import {Hoc, IImperiumClient, ImperiumClientModule} from '@imperium/client';
import {ImperiumRoute, ImperiumRouterClientModule} from './types';

const d = debug('imperium.router.withRouter');

export default function withRouter(client: IImperiumClient): Hoc {
	// Load routes
	d('Loading routes');
	const routes = client.modules.reduce((memo, module: ImperiumClientModule & ImperiumRouterClientModule) => {
		if (module.routes) {
			return [...memo, ...module.routes];
		}
		return memo;
	}, [] as ImperiumRoute[]);

	return function routerHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithRouter(props: any) {
			return (
				<BrowserRouter>
					<WrappedComponent {...props} routes={routes} />
				</BrowserRouter>
			);
		}

		ComponentWithRouter.displayName = `withRouter(${displayName}`;
		return ComponentWithRouter;
	};
}
