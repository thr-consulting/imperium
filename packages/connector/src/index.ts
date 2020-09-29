import type {TypeOfPromise} from '@imperium/util';

export {Connector, ConnectorsConfig} from './Connector';

export interface AuthenticatedUser {
	auth?: {
		id?: string;
	};
	hostname?: string;
	ip?: string;
	headers?: {
		[key: string]: string;
	};
}

interface ImperiumBaseContext {
	__session: string;
}

export type ImperiumContext<C extends (...args: any) => any> = TypeOfPromise<ReturnType<C>> & ImperiumBaseContext;
