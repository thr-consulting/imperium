import type {TypeOfPromise} from '@thx/util';
import {randomId} from '@thx/random';

export {Connector} from './Connector';
export {Connectors} from './Connectors';

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

export function ImperiumBaseContext() {
	return {
		__session: randomId(8),
	};
}

export type ImperiumContext<C extends (...args: any) => any> = TypeOfPromise<ReturnType<C>>;
