import {Application} from '@types/express';

export class Connectors {
	create: () => {};
	close: () => void
}

export interface ServerModuleReturn {
	models?: string,
	schema?: string,
	resolvers?: string,
	endpoints?: string,
}

export interface EndpointParameters {
	app: Application,
	connectors?: Connectors,
	modules: ServerModuleReturn[],
	middleware?: any,
}
