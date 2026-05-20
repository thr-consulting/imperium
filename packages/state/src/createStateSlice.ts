import {createSlice, type CreateSliceOptions, type Slice, type SliceCaseReducers} from '@reduxjs/toolkit';

export type PersistedSlice<T = any> = Slice<T> & {p?: boolean};

export function createStateSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name> & {persist?: boolean},
): PersistedSlice<State> {
	const {persist, ...rest} = options;
	const slice = createSlice(rest);

	return Object.assign(slice, {p: persist});
}
