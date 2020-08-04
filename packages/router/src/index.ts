import type {ImperiumClientModule} from '@imperium/client';
import withRouter from './withRouter';

export default function ImperiumRouterModule(): ImperiumClientModule {
	return {
		name: '@imperium/router',
		hocs: [withRouter],
	};
}

export {default as RouteDirector} from './RouteDirector';
export {ImperiumRoute, ImperiumRouterClientModule} from './types';
