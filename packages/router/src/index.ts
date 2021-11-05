import type {ImperiumClientModule} from '@imperium/client';
import withRouter from './withRouter';

export function routerClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/router',
		order: 15,
		hocs: [withRouter],
	};
}

export type {ImperiumRouterClientModule, Routes, DefineRouteOptions, RouteOptions, KeyedRouteRenderFns, ParametersFromAssertion} from './types';
export {ContentRouter} from './components/ContentRouter';
export {defineRoutes} from './defineRoutes';
