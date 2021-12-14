/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const state = createSlice({
	name: 'imperiumLayout',
	initialState: {
		isMobile: false,
		params: {},
	},
	reducers: {
		setMobile: (st, action: PayloadAction<boolean>) => ({...st, isMobile: action.payload}),
		setParams: (st, action: PayloadAction<Record<string, string>>) => {
			st.params = action.payload;
		},
	},
});

export const useLayoutState = createSliceHook(state);

export const {actions} = state;
