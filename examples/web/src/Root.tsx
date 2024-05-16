import {default as debug} from 'debug';
import type React from 'react';
import {ContentRouter} from '@imperium/router';

const d = debug('imperium.client.Root');

export function Root(props: any): React.ReactNode {
	return <ContentRouter {...props} />;
}
