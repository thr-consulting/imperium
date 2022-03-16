import {default as debug} from 'debug';
import type React from 'react';
import type {ImperiumClient} from './ImperiumClient';

const d = debug('imperium.client.Root');

export interface RootProps {
	render: (props?: any) => React.ReactNode;
	imperiumClient: ImperiumClient;
}

export function Root(props: RootProps): React.ReactNode {
	return props.render(props);
}
