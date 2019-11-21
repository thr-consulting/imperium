import withRouter from './withRouter';

export default function ImperiumRouterModule() {
	return {
		name: '@imperium/router',
		hocs: [withRouter],
	};
}

export {default as RouteDirector} from './RouteDirector';
export {ImperiumRoute, ImperiumRouterClientModule} from './types';
