import {Application, Request} from 'express';
import DataLoader from 'dataloader';
import {Document, Model, Types} from 'mongoose';

export type ImperiumConnectorsMap = {[connectorName: string]: any};

export interface ImperiumConnectors {
	create(): Promise<ImperiumConnectorsMap>;
	close(): Promise<void>;
}

export interface EndpointOptions {
	app: Application;
	connectors?: ImperiumConnectorsMap;
	modules: ImperiumServerModule[];
	middlewares?: any;
}

export interface ModelsMap {
	[key: string]:
		| DataLoader<string | Types.ObjectId, Document>
		| Model<Document>;
}

export interface IContext {
	addModels(
		modelFunc: (
			connectors: ImperiumConnectorsMap,
			context: IContext,
		) => ModelsMap,
	): void;
	getModel(name: string): any;
	models: {[modelName: string]: any};
	auth: any;
	connectors: ImperiumConnectorsMap;
}

export interface ImperiumServerModule {
	name: string;
	middleware?: () => {[key: string]: () => {}};
	endpoints?: (options: EndpointOptions) => void;
	models: (connectors: ImperiumConnectorsMap, context: IContext) => ModelsMap;
}

export type ImperiumServerModuleFunction = () => ImperiumServerModule;

export interface ImperiumRequest extends Request {
	context: IContext;
}

export interface ImperiumClientModule {
	name: string;
}

export type ImperiumClientModuleFunction = () => ImperiumClientModule;
