import type {Slice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

type Transforms<State> = {
	[K in keyof State]?: (v: State[K]) => any | State[K];
};

type Transformers<State, T extends Transforms<State>> = {
	[K in keyof T]: T[K] extends (v: any) => any ? ReturnType<T[K]> : never;
};

type TransformedState<State, T extends Transforms<State>> = Transformers<State, T> & Omit<State, keyof Transformers<State, T>>;

/**
 * Create a selector hook for a particular state slice with optional transformers
 * @param slice
 * @param transformers
 */
export function createSliceHook<State, T extends Transforms<State>>(slice: Slice<State>, transformers?: T) {
	return () => {
		const rawState = useSelector<unknown, State>(st => (st as Record<string, never>)[slice.name]);
		const keys = Object.keys(rawState) as (keyof State)[];
		return keys.reduce((memo, key) => {
			const fn = transformers ? transformers[key] : null;
			if (fn && typeof fn === 'function') {
				return {
					...memo,
					[key]: fn(rawState[key] as any),
				};
			}
			return {
				...memo,
				[key]: rawState[key],
			};
		}, {} as TransformedState<State, T>);
	};
}
