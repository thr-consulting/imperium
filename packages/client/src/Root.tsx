import debug from 'debug';
import React from 'react';
import {IImperiumClient, RootProps} from './types';

const d = debug('imperium.client.Root');

interface Props {
	render: (props: RootProps) => React.ReactNode;
	imperiumClient: IImperiumClient;
}

export default function Root(props: Props) {
	return props.render(props);
}
