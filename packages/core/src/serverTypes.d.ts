import {Application} from 'express';
import DataLoader from 'dataloader';
import {Document, Model, Types} from 'mongoose';
import Context from './server/Context';

export type ImperiumConnectors = {[connectorName: string]: any};

export interface ImperiumConnectorsInterface {
	create(): Promise<ImperiumConnectors>;
	close(): Promise<void>;
}

export interface EndpointOptions {
	app: Application;
	connectors?: ImperiumConnectors;
	modules: ImperiumServerModule[];
	middlewares?: any;
}

export interface Models {
	[key: string]:
		| DataLoader<string | Types.ObjectId, Document>
		| Model<Document>;
}

export interface ImperiumServerModule {
	name: string;
	middleware?: () => {[key: string]: () => {}};
	endpoints?: (options: EndpointOptions) => void;
	models: (connectors: ImperiumConnectors, context: Context) => Models;
}

export type ImperiumServerModuleFunction = () => ImperiumServerModule;
