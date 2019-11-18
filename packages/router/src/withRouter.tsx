import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Hoc} from '@imperium/client';

export default function withRouter(): Hoc {
	return function routerHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithRouter(props: any) {
			return (
				<BrowserRouter>
					<WrappedComponent {...props} />
				</BrowserRouter>
			);
		};

		ComponentWithRouter.displayName = `withRouter(${displayName}`;
		return ComponentWithRouter;
	};
}
