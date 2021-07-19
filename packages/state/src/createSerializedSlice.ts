import type {CreateSliceOptions, SliceCaseReducers} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {Serializer} from './types';
import {getActions} from './getActions';
import {createSerializedSelectorHook} from './createSerializedSelectorHook';

/**
 * Creates a Redux slice of any types, with serializer and parsing functions
 * @param options
 */
export function createSerializedSlice<State, CaseReducers extends SliceCaseReducers<State>, T extends Serializer, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name> & {serializer: T},
) {
	const slice = createSlice(options);
	const actions = getActions(slice, options.serializer);
	const useSelector = createSerializedSelectorHook(slice, options.serializer);

	return {
		actions,
		useSelector,
		name: slice.name,
		caseReducers: slice.caseReducers,
		reducer: slice.reducer,
	};
}
