/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export const state = createSlice({
	name: 'layout-sample',
	initialState: {
		id: '',
		text: '',
	},
	reducers: {
		setId: (st, action: PayloadAction<string>) => {
			st.id = action.payload;
		},
		setText: (st, action: PayloadAction<string>) => {
			st.text = action.payload;
		},
	},
});

export const useLayoutState = createSliceHook(state);

export const {setId, setText} = state.actions;
