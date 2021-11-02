/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export const state = createSlice({
	name: 'layout-sample',
	initialState: {
		myParam: '',
	},
	reducers: {
		setParam: (st, action: PayloadAction<string>) => {
			st.myParam = action.payload;
		},
	},
});

export const useLayoutState = createSliceHook(state);

export const {setParam} = state.actions;
