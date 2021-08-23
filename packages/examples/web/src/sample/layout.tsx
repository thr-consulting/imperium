import React from 'react';
import {Menu, Image, Header} from 'semantic-ui-react';
import type {LayoutData} from '@imperium/layout';
import {Link} from 'react-router-dom';
import imperiumLogo from './imperium_w.png';
import {routes} from './routes';

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
					text: 'Thing 0',
					to: routes.to.home(),
					weight: 5,
				},
				{
					text: 'Thing 1',
					to: routes.to.home(),
					weight: 1,
					icon: 'adn',
				},
			],
		},
	],
};
