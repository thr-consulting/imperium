import debug from 'debug';
import React from 'react';
import {hot} from 'react-hot-loader/root';
import {RootProps} from './types';

const d = debug('imperium.client.Root');

interface Props {
	render: (props: RootProps) => React.ReactNode;
}

function Root(props: Props) {
	return props.render(props);
}

export default hot(Root);
