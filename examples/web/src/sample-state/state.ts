/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import {LocalDate} from '@js-joda/core';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

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
		setNum: (st, action: PayloadAction<number>) => {
			st.num = action.payload;
		},
	},
});

export const useSampleState = createSliceHook(state, {
	date: n => LocalDate.ofEpochDay(n),
});

export const {setDate} = state.actions;
