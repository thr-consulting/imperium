import type {EnvironmentDefaultDict} from '@thx/env';
import type React from 'react';
import type {ImperiumClient} from './ImperiumClient';

export interface ImperiumClientConfig {
	clientModules: () => ImperiumClientModule[];
	render: (props?: any) => React.ReactNode;
}

export type Hoc = (
	WrappedComponent: React.ComponentType,
) => {
	(props: any): React.ReactNode;
	displayName: string;
};
export type HocCreator = (client: ImperiumClient) => Hoc;

export interface ImperiumClientModule {
	name: string;
	startup?: (client: ImperiumClient) => Promise<void>; // RootProps | void;
	hocs?: HocCreator[];
	environmentDefaults?: EnvironmentDefaultDict;
}
