import {createSerializedSlice, createSerializedSelectorHook} from '@imperium/state';
import {LocalDate} from '@js-joda/core';
import type {PayloadAction} from '@reduxjs/toolkit';

const serializer = {
	state: {
		date: (v: number) => LocalDate.ofEpochDay(v),
	},
	actions: {
		setDate: (a: LocalDate) => a.toEpochDay(),
	},
};

export const state = createSerializedSlice({
	name: 'state-sample',
	initialState: {
		date: LocalDate.now().toEpochDay(),
	},
	reducers: {
		setDate: (st, action: PayloadAction<number>) => {
			return {...st, date: action.payload};
		},
	},
	serializer,
});

export const {useSelector: useSampleState} = state;
export const {setDate} = state.actions;
