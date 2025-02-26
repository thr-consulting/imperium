import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import {useCan} from '@imperium/auth-client';
import {Permission} from '../core/graphql';
import {routes} from './routes';
import {useSampleState} from '../sample-state/state';

const d = debug('imperium.web.sample-auth.layout');

export const layout: LayoutData = {
	permissions: [Permission.GetPing],
	primaryMenu: [
		{
			to: routes.to.login(),
			visible: ({id}) => {
				// d(permissions);
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
			permissionSelectorHook: [
				() => {
					const [getLoc] = useCan(Permission.GetLoc);
					return {getLoc};
				},
			],
			stateSelectorHook: [useSampleState],
		},
	],
};
