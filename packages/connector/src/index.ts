import {randomId} from '@thx/random';
import type {TypeOfPromise} from '@thx/util';

export {Connector} from './Connector';
export {Connectors} from './Connectors';
export {ImperiumError} from './ImperiumError';

export function ImperiumBaseContext() {
	return {
		__session: randomId(8).toLowerCase(),
	};
}

export type ImperiumContext<C extends (...args: any) => any> = TypeOfPromise<ReturnType<C>>;
