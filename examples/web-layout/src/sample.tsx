import type {ImperiumRouterClientModule} from '@imperium/router';
import {defineRoutes} from '@imperium/router';

const routes = defineRoutes({
	home: {
		path: '/',
	},
});

const routeProps = routes.renderRouteProps({
	home: () => <div>Hello World</div>,
});

export function sample(): ImperiumRouterClientModule {
	return {
		name: 'Sample',
		routeProps,
	};
}
