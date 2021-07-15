import type {PayloadAction} from '@reduxjs/toolkit';
import {createSelectorHook, createSlice} from '@imperium/state';
import type {Serializer} from '@imperium/state';
import {LocalDate} from '@js-joda/core';

const serializer: Serializer = {
	state: {
		date: (v: number) => LocalDate.ofEpochDay(v),
	},
	actions: {
		setDate: (a: PayloadAction<LocalDate>) => a.payload.toEpochDay(),
	},
};

export const state = createSlice({
	name: 'state-sample',
	initialState: {
		date: LocalDate.now(),
	},
	reducers: {
		setDate: (st, action: PayloadAction<LocalDate>) => {
			return {...st, date: action.payload};
		},
	},
	serializer,
});

export const useSampleState = createSelectorHook(state, serializer);

export const {actions} = state;
