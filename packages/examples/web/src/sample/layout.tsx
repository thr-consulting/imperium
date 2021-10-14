import type {LayoutData} from '@imperium/layout';
import {generateVisible} from '@imperium/layout';
import debug from 'debug';
import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Image, Header} from 'semantic-ui-react';
import HelloWorld from './components/HelloWorld';
import {ParamTest} from './components/ParamTest';
import imperiumLogo from './imperium_w.png';
import {routes} from './routes';

const d = debug('imperium.examples.web.sample.layout');

export const layout: Partial<LayoutData> = {
	menubar: [
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
	sidebar: [
		{
			text: 'Dropdown',
			icon: 'protect',
			dropdown: [
				{
					text: 'Thing 5',
					to: routes.to.home(),
					weight: 5,
				},
				{
					text: 'Thing 1',
					to: '/param-test/id/thing',
					weight: 1,
					icon: 'adn',
				},
				{
					text: 'Thing 2',
					to: loc => routes.to.paramsTwo(routes.match.params(loc.pathname)),
					weight: 2,
					icon: 'star',
				},
				{
					text: 'Thing 3',
					to: routes.to.home(),
					weight: 3,
					icon: 'file',
					visible: generateVisible({
						query: {'router.path': 'param-test'},
					}),
				},
			],
		},
	],
};

export const routeProps = routes.renderRouteProps({
	home: () => <HelloWorld />,
	params: () => <ParamTest />,
	paramsTwo: () => <ParamTest />,
});
