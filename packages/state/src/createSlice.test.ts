/* eslint-disable no-param-reassign */
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

describe('create a slice', () => {
	it('should create a slice', () => {
		const slice = createSlice({
			name: 'name',
			initialState: {
				a: 5,
			},
			reducers: {
				setA: (st, action: PayloadAction<number>) => {
					st.a = action.payload;
				},
				whateverA: (st, action: PayloadAction<{setA: number}>) => {
					st.a = action.payload.setA;
				},
			},
		});

		expect(slice.name).toBe('name');
		const action = slice.actions.setA(2);
		expect(action).toMatchSnapshot();
		expect(slice.reducer({a: 5}, action)).toMatchSnapshot();
	});

	it('should create a slice with prepare', () => {
		const slice = createSlice({
			name: 'name',
			initialState: {
				a: 5,
			},
			reducers: {
				setA: {
					reducer: (st, action: PayloadAction<number>) => {
						st.a = action.payload;
					},
					prepare: (text: string) => {
						return {
							payload: parseInt(text, 10),
						};
					},
				},
			},
		});

		expect(slice.name).toBe('name');
		const action = slice.actions.setA('2');
		expect(action).toMatchSnapshot();
		expect(slice.reducer({a: 5}, action)).toMatchSnapshot();
	});
});
