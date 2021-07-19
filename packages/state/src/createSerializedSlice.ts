import type {CreateSliceOptions, SliceCaseReducers} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {createSerializedSelectorHook} from './createSerializedSelectorHook';
import {getActions} from './getActions';
import type {Serializer} from './types';

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
