import {randomId} from '@thx/random';
import type {TypeOfPromise} from '@thx/util';

export {Connector} from './Connector';
export {Connectors} from './Connectors';
export {ImperiumError} from './ImperiumError';

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
