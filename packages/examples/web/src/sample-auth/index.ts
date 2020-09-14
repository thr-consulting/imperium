import loadable from '@loadable/component';
import type {ImperiumRouterClientModule} from '@imperium/router';

const Login = loadable<any>(() => import('./components/Login'));
const ComponentUsingAuth = loadable<any>(() => import('./components/ComponentUsingAuth'));

export function sampleAuthModule(): ImperiumRouterClientModule {
	return {
		name: 'AuthSample',
		routes: [
			{
				path: '/login',
				content: Login,
			},
			{
				path: '/auth-test',
				content: ComponentUsingAuth,
			},
		],
	};
}
