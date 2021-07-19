import type {PayloadAction} from '@reduxjs/toolkit';
import {createSerializedSlice} from '@imperium/state';
import {LocalDate} from '@js-joda/core';

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
	serializer: {
		state: {
			date: (v: number) => LocalDate.ofEpochDay(v),
		},
		actions: {
			setDate: (a: LocalDate) => a.toEpochDay(),
		},
	},
});

export const {
	useSelector: useSampleState,
	actions: {setDate},
} = state;
