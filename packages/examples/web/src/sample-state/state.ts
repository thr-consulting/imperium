/* eslint-disable no-param-reassign */
import {LocalDate} from '@js-joda/core';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {createSliceHook} from '@imperium/state';

export const state = createSlice({
	name: 'state-sample',
	initialState: {
		date: LocalDate.now().toEpochDay(),
		num: 5,
	},
	reducers: {
		setDate: {
			reducer: (st, action: PayloadAction<number>) => {
				st.date = action.payload;
			},
			prepare: (date: LocalDate) => ({payload: date.toEpochDay()}),
		},
	},
});

export const useSampleState = createSliceHook(state, {
	date: n => LocalDate.ofEpochDay(n),
});
export const {setDate} = state.actions;
