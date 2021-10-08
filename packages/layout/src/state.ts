import {createSliceHook} from '@imperium/state';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const state = createSlice({
	name: 'imperiumLayout',
	initialState: {
		isMobile: false,
	},
	reducers: {
		setMobile: (st, action: PayloadAction<boolean>) => ({...st, isMobile: action.payload}),
	},
});

export const useLayoutState = createSliceHook(state);

export const {actions} = state;
