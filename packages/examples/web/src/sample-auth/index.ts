import type {ImperiumRouterClientModule} from '@imperium/router';
import type {ImperiumLayoutClientModule} from '@imperium/layout';
import {routes} from './routes';

export function sampleAuthModule(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'AuthSample',
		routes,
		layout: {
			sidebar: [
				{
					to: routes.to.authTest(),
					text: 'Auth',
				},
			],
			menubar: [
				{
					to: routes.to.login(),
					text: 'Login',
					position: 'right',
				},
			],
		},
	};
}
