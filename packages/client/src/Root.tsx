import debug from 'debug';
import React from 'react';
import {hot} from 'react-hot-loader/root';
import {RootProps} from './types';

const d = debug('imperium.client.Root');

interface Props {
	rootComponent: React.Component;
	rootProps?: RootProps;
	hoc?: any; // TODO This is a cheat, but React Typescript isn't easy.
}

function Root(props: Props) {
	const RootWrappedComponent = props.hoc(props.rootComponent);
	return <RootWrappedComponent {...props.rootProps} />;
}

export default hot(Root);
