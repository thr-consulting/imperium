import {name} from '../package.json';
import withRouter from './withRouter';

export default function ImperiumRouterModule() {
	return {
		name,
		hocs: [withRouter],
	};
}

export {default as RouteDirector} from './RouteDirector';
