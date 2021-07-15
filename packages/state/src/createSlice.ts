import {createSlice as cSlice} from '@reduxjs/toolkit';
import type {CreateSliceOptions as CSliceOptions, Slice as ReduxSlice, SliceCaseReducers} from '@reduxjs/toolkit/src/createSlice';
import type {Serializer, SliceWithSerializer} from './types';

export interface CreateSliceWithSerializerOptions<State, CaseReducers extends SliceCaseReducers<State>> extends CSliceOptions<State, CaseReducers> {
	serializer?: Serializer;
}

export function createSlice<State, CaseReducers extends SliceCaseReducers<State>>(
	options: CreateSliceWithSerializerOptions<State, CaseReducers>,
): SliceWithSerializer<State, CaseReducers> {
	return {
		...cSlice<State, CaseReducers>(options),
		serializer: options.serializer,
	};
}
