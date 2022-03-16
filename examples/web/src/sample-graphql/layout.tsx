import type {LayoutData} from '@imperium/layout/src';
import loadable from '@loadable/component';
import {routes} from './routes';

const GraphqlTest = loadable<any>(() => import('./components/GraphqlTest'));

export const layout: Partial<LayoutData> = {
	secondaryMenu: [
		{
			to: routes.to.sampleGraphql(),
			text: 'Graphql',
		},
	],
};

export const routeProps = routes.renderRouteProps({
	sampleGraphql: () => <GraphqlTest />,
});
