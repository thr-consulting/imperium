import loadable from '@loadable/component';
import {ImperiumClientModule} from '@imperium/client';
import {ImperiumRouterClientModule} from '@imperium/router';

const Login = loadable(() => import('./components/Login'));
const ComponentUsingAuth = loadable(() => import('./components/ComponentUsingAuth'));

export default function authsample(): ImperiumClientModule & ImperiumRouterClientModule {
	return {
		name: 'AuthSample',
		routes: [
			{
				path: '/login',
				content: Login,
			},
			{
				path: '/useAuth',
				content: ComponentUsingAuth,
			},
		],
	};
}
