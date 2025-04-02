/* eslint-disable no-param-reassign */
import {createSliceHook} from '@imperium/state';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {env} from '@thx/env';
import {defaults} from './defaults';

export const authenticatedState = createSlice({
	name: '@imperium/auth-client/authenticated',
	initialState: {
		id: localStorage.getItem(env.getString('authIdKey', defaults.authIdKey)) || undefined,
	},
	reducers: {
		setAuthenticated(st, action: PayloadAction<{auth?: {id?: string}; token: string | null} | null>) {
			if (action.payload && action.payload.auth?.id) {
				st.id = action.payload.auth.id;
			} else {
				st.id = undefined;
			}
		},
	},
});

export const tokenState = createSlice({
	name: '@imperium/auth-client/token',
	initialState: {
		token: localStorage.getItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey)) || null,
	},
	reducers: {
		renewToken(st, action: PayloadAction<string | null>) {
			st.token = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(authenticatedState.actions.setAuthenticated, (st, action: PayloadAction<{auth?: {id?: string}; token: string | null} | null>) => {
			if (action.payload && action.payload.token) {
				st.token = action.payload.token;
			} else {
				st.token = null;
			}
		});
	},
});

export const useAuthenticatedState = createSliceHook(authenticatedState);
export const {setAuthenticated} = authenticatedState.actions;
export const useTokenState = createSliceHook(tokenState);
export const {renewToken} = tokenState.actions;
