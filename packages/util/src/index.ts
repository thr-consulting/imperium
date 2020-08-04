export {log, default as inspectLoader} from './inspectLoader';
export type {Inspection} from './inspectLoader';
export {default as commonWebpack} from './commonWebpack';
export {isString} from './typeguards';

/**
 * Take each field's value in an object and map it to functions that return the values.
 * @param obj
 */
export function valuesToFunctions<T extends Record<string, unknown>>(obj: T): {[P in keyof T]: () => T[P]} {
	return (Object.keys(obj) as (keyof T)[]).reduce((memo, v) => {
		return {
			...memo,
			[v]: () => obj[v],
		};
	}, {} as {[P in keyof T]: () => T[P]});
}

export type TypeOfPromise<T> = T extends Promise<infer U> ? U : never;
// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends Function ? T : T extends Record<string, unknown> ? {[P in keyof T]?: DeepPartial<T[P]>} : T;
