import React from 'react';
import debug from 'debug';
import {LocalDate} from '@js-joda/core';
import {useDispatch} from 'react-redux';
import {formatDate} from '@thx/date';
import {LocalDatePicker} from '@thx/controls';
import {useSampleState, setDate} from '../state';

const d = debug('imperium.examples.web.sample-state.StateExample');

export default function StateExample() {
	const state = useSampleState();
	const dispatch = useDispatch();

	d(state);

	return (
		<>
			<h1>State Example</h1>
			<p>TheDate: {formatDate(state.date)}</p>
			<LocalDatePicker
				value={state.date}
				onChange={v => {
					dispatch(setDate(v || LocalDate.now()));
				}}
			/>
		</>
	);
}
