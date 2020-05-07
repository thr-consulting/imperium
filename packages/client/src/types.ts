import type React from 'react';

export type ImperiumEnvironmentVar = string | number | boolean | ImperiumEnvironment;
export type ImperiumEnvironment = {[key: string]: ImperiumEnvironmentVar | ImperiumEnvironmentVar[]};

export type GlobalConst = {[key: string]: string | number | boolean};
export type RootProps = {[key: string]: any};
export type Hoc = (
	WrappedComponent: React.ComponentType,
) => {
	(props: any): React.ReactNode;
	displayName: string;
};
export type HocCreator = (client: IImperiumClient) => Hoc;

export interface ImperiumClientModule {
	name: string;
	environment?: (globalConst: GlobalConst, currentEnvironment: ImperiumEnvironment) => Promise<ImperiumEnvironment>;
	startup?: (client: IImperiumClient) => RootProps | void;
	hocs?: HocCreator[];
}

export type ImperiumClientModuleFunction = () => ImperiumClientModule;

export interface IImperiumClient {
	start(): Promise<void>;
	readonly modules: ImperiumClientModule[];
	readonly environment: ImperiumEnvironment;
	readonly globalConst: GlobalConst;
}
