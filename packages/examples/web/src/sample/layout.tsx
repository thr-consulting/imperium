import type {LayoutData} from '@imperium/layout';
import debug from 'debug';
import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Image, Header} from 'semantic-ui-react';
import HelloWorld from './components/HelloWorld';
import imperiumLogo from './imperium_w.png';
import {routes} from './routes';

const d = debug('imperium.examples.web.sample.layout');

export const layout: Partial<LayoutData> = {
	primaryMenu: [
		{
			stickOnMobile: true,
			weight: -9999,
			render: () => {
				return (
					<Menu.Item as={Link} link to={routes.to.home()} style={{padding: '0 0.4em'}}>
						<Header inverted>
							<Image src={imperiumLogo} size="mini" />
							Imperium
						</Header>
					</Menu.Item>
				);
			},
		},
	],
};

export const routeProps = routes.renderRouteProps({
	home: () => <HelloWorld />,
});
