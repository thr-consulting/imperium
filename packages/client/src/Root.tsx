import debug from 'debug';
import type React from 'react';
import type {IImperiumClient, RootProps} from './types';

const d = debug('imperium.client.Root');

interface Props {
	render: (props: RootProps) => React.ReactNode;
	imperiumClient: IImperiumClient;
}

export default function Root(props: Props): React.ReactNode {
	return props.render(props);
}
