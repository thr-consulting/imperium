import debug from 'debug';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import type {Hoc, ImperiumClient} from '@imperium/client';
import type {ImperiumRoute} from './types';
import {isImperiumRouterClientModule} from './types';

const d = debug('imperium.router.withRouter');

export default function withRouter(client: ImperiumClient): Hoc {
	// Load routes
	d('Loading routes');
	const routes = client.modules.reduce((memo, module) => {
		if (isImperiumRouterClientModule(module)) {
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
