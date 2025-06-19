import {useCan} from '@imperium/auth-client';
import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import {Permission} from '../core/graphql';
import {useSampleState} from '../sample-state/state';
import {routes} from './routes';

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
