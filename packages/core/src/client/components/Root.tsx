import debug from 'debug';
import React from 'react';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router} from 'react-router-dom';
import RouteDirector from './RouteDirector/RouteDirector';
import {ImperiumRoute, RootProps} from '../../../types';

const d = debug('imperium.core.Root');

interface Props {
	routes: ImperiumRoute[];
	routeDefaults: {[key: string]: any};
	rootProps: RootProps;
	hoc: any; // This is a cheat, but React Typescript isn't easy. This could be Hoc from types.d.ts, but....
}

function withRouter(WrappedComponent: React.ComponentType<any>) {
	return function includeRouter(props: any) {
		return (
			<Router>
				<WrappedComponent {...props} />
			</Router>
		);
	};
}

function Root(props: Props) {
	const RootWrappedComponent = withRouter(props.hoc(RouteDirector));
	return <RootWrappedComponent routes={props.routes} defaults={props.routeDefaults} {...props.rootProps} />;
}

export default hot(Root);
