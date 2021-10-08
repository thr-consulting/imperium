import type {AbstractRepository} from './AbstractRepository';
import type {EntityBase, Initializers} from './types';

interface GetInitializersOpts {
	[key: string]: AbstractRepository<EntityBase> | any;
}

type GetInitializersReturn<T extends GetInitializersOpts> = {
	[key in keyof T]: Initializers<T[key]>;
};

/**
 * Returns an object of repositories transformed into initializer functions only.
 * @param repositories
 */
export function getInitializers<T extends GetInitializersOpts>(repositories: T): GetInitializersReturn<T> {
	return repositories;
}
