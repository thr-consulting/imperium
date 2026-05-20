import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import {routes as sampleRoutes} from '../sample/routes';
import {useGetData} from './hooks/useGetData';
import {routes} from './routes';
import {useLayoutState} from './state';

const d = debug('imperium.example-web.sample-layout.layout');

export const layout: LayoutData = {
	dataHooks: [
		{
			routeMatch: routes.match.withParam,
			dataHook: useGetData,
		},
	],
	primaryMenu: [
		{
			stateSelectorHook: useLayoutState,
			text: s => {
				return s.state.myParam || '';
			},
			visible: () => true,
		},
		{
			text: 'DropdownMenu',
			dropdown: [
				{
					text: 'Thing',
				},
			],
		},
		{
			text: 'Content',
			to: routes.to.content(),
		},
	],
	secondaryMenu: [
		{
			stateSelectorHook: useLayoutState,
			text: 'Dropdown',
			icon: 'protect',
			key: 'dropdown',
			dropdown: [
				{
					text: 'To home',
					to: sampleRoutes.to.home(),
					weight: 5,
				},
				{
					text: 'Param 1 - Static',
					to: '/layout/param/testParam1',
					weight: 1,
					icon: 'building',
				},
				{
					text: 'Param 2',
					to: routes.to.withParam({myParam: 'testParam2'}),
					weight: 1,
					icon: 'adn',
				},
				{
					text: ({state}) => {
						return (state?.myParam as string) || '404';
					},
					to: ({loc}) => routes.to.withParam(routes.match.withParam(loc.pathname)),
					weight: 2,
					icon: data => {
						if (data.active) return 'star';
						return 'video';
					},
				},
				{
					text: 'Param 3',
					to: data => {
						return routes.to.withParam({myParam: data.state.myParam});
					},
					weight: 1,
					icon: 'chart pie',
				},
				{
					text: 'No Param (Hides)',
					to: routes.to.noParam(),
					weight: 3,
					icon: 'file',
					visible: {'route.path': 'layout'},
				},
			],
		},
		{
			text: 'SubMenu',
			menu: [
				{
					text: 'Thing',
				},
			],
		},
	],
	statusbar: [
		{
			text: 'Test',
		},
		{
			text: 'Test Right',
			position: 'right',
		},
	],
	footer: [
		{
			text: 'Test',
		},
	],
};
