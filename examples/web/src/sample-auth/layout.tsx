import {useCan} from '@imperium/auth-client';
import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import {routes} from './routes';

const d = debug('imperium.web.sample-auth.layout');

export const layout: LayoutData = {
	permissionSelectorHooks: [
		() => {
			const [getPing] = useCan('getPing');
			return {getPing};
		},
	],
	primaryMenu: [
		{
			permissionSelectorHook: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const [getStuff] = useCan('getStuff');
				return {getStuff};
			},
			to: routes.to.login(),
			visible: ({id}) => {
				return !id;
			},
			text: 'Login',
			position: 'right',
		},
	],
	secondaryMenu: [
		{
			to: routes.to.authTest(),
			text: 'Auth',
		},
	],
};
