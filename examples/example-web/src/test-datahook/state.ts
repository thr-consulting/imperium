/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export const state = createSlice({
	name: 'test-datahook',
	initialState: {
		text: 'Initial value',
	},
	reducers: {
		setText: (st, action: PayloadAction<string>) => {
			st.text = action.payload;
		},
	},
});

export const useTestDatahookState = createSliceHook(state);

export const {setText} = state.actions;
