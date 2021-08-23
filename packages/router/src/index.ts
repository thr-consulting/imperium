import type {ImperiumClientModule} from '@imperium/client';
import withRouter from './withRouter';

export function routerClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/router',
		hocs: [withRouter],
	};
}

export type {ImperiumRouterClientModule} from './types';
export {ContentRouter} from './components/ContentRouter';
export {createRouteSlice} from './createRouteSlice';
