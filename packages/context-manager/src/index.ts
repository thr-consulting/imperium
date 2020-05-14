export {ContextManager} from './ContextManager';
export {Connector, ConnectorsConfig} from './Connector';
export {Auth, AuthImplementation} from './Auth';

/**
 * Take each field's value in an object and map it to functions that return the values.
 * This is useful when passing TypeORM models to the TypeORM connector.
 * @param entities
 */
export function spreadEntities<T extends object>(entities: T) {
	return (Object.keys(entities) as (keyof T)[]).reduce((memo, v) => {
		return {
			...memo,
			[v]: () => entities[v],
		};
	}, {} as {[P in keyof T]: () => T[P]});
}
