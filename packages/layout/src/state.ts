/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export const state = createSlice({
	name: 'imperiumLayout',
	initialState: {
		isMobile: false,
		params: {},
		permissions: {} as Record<string, boolean>,
		pageHeader: '',
	},
	reducers: {
		setMobile: (st, action: PayloadAction<boolean>) => ({...st, isMobile: action.payload}),
		setParams: (st, action: PayloadAction<Record<string, string>>) => {
			st.params = action.payload;
		},
		setPermission: (st, action: PayloadAction<{permission: string; result: boolean}>) => {
			st.permissions[action.payload.permission] = action.payload.result;
		},
		setPageHeader: (st, action: PayloadAction<string>) => {
			st.pageHeader = action.payload;
		},
	},
});

export const useLayoutState = createSliceHook(state);

export const {actions} = state;
