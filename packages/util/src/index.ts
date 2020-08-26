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

/*
	When passed a promise of a type, return just the type.
 */
export type TypeOfPromise<T> = T extends Promise<infer U> ? U : never;

/*
	Like the Partial<> type but travels down the tree.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends Function ? T : T extends Record<string, unknown> ? {[P in keyof T]?: DeepPartial<T[P]>} : T;

/*
	Use this to filter false values out of an array:

	const arr = [
		1,
		2,
		3,
		mybool && 4,
	].filter((Boolean as any) as ExcludeFalse);
 */
export type ExcludeFalse = <T>(x: T | false) => x is T;
