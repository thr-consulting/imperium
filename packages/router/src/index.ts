import type {ImperiumClientModule} from '@imperium/client';
import withRouter from './withRouter';

export function routerClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/router',
		hocs: [withRouter],
	};
}

export {default as RouteDirector} from './RouteDirector';
export type {ImperiumRoute, ImperiumRouterClientModule} from './types';
