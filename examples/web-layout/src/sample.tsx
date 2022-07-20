import type {ImperiumRouterClientModule} from '@imperium/router';
import {defineRoutes} from '@imperium/router';
import type {ImperiumLayoutClientModule, LayoutData} from '@imperium/layout';
import {Alarm} from 'tabler-icons-react';

const routes = defineRoutes({
	home: {
		path: '/',
	},
});

const routeProps = routes.renderRouteProps({
	home: () => <div>Hello World</div>,
});

const layout: LayoutData = {
	primaryMenu: [
		{
			text: 'Item',
		},
		{
			text: 'Link',
			to: routes.to.home(),
		},
		{
			text: 'Icon',
			icon: <Alarm />,
		},
		{
			text: 'Stuff',
			position: 'right',
		},
	],
};

export function sample(): ImperiumRouterClientModule & ImperiumLayoutClientModule {
	return {
		name: 'Sample',
		routeProps,
		layout,
	};
}
