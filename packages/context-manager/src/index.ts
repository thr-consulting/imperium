export {ContextManager} from './ContextManager';
export {Connector, ConnectorsConfig} from './Connector';

export function spreadEntities<T extends object>(entities: T) {
	return (Object.keys(entities) as (keyof T)[]).reduce((memo, v) => {
		return {
			...memo,
			[v]: () => entities[v],
		};
	}, {} as {[P in keyof T]: () => T[P]});
}
