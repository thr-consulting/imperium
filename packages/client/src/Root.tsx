import debug from 'debug';
import React from 'react';
import {hot} from 'react-hot-loader/root';
import {ImperiumRoute, RootProps} from '../types';

const d = debug('imperium.client.Root');

interface Props {
	routes: ImperiumRoute[];
	rootComponent: React.Component;
	rootProps?: RootProps;
	hoc?: any; // This is a cheat, but React Typescript isn't easy. This could be Hoc from types.d.ts, but....
}

function Root(props: Props) {
	const RootWrappedComponent = props.hoc(props.rootComponent);
	return <RootWrappedComponent routes={props.routes} {...props.rootProps} />;
}

export default hot(Root);
