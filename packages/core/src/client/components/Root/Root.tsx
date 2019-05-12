import React from 'react';
import debug from 'debug';
import {BrowserRouter as Router} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import {FragmentContext} from '@imperium/context';
// @ts-ignore
import routeDefaults from 'routeDefaults';
import RouteDirector from '../RouteDirector';
import './root.css';
import {Fragments, ImperiumRoute} from '../../../../types';

const d = debug('imperium.core.Root');

interface ChildProps {
	Child: React.ComponentType,
}

interface Props {
	routes?: ImperiumRoute[],
	fragments?: Fragments,
	render: (Props: ChildProps) => JSX.Element,
	startupData?: {},
}

function Root(props: Props): JSX.Element {
	d('Rendering Root component');
	const {routes, fragments, render, startupData} = props;

	const Child: React.FunctionComponent = childProps => (
		<RouteDirector routes={routes} defaults={routeDefaults} {...childProps}/>
	);

	return (
		<Router>
			<FragmentContext.Provider value={fragments || {}}>
				{render({Child, ...startupData})}
			</FragmentContext.Provider>
		</Router>
	);
}

export default hot(Root);
