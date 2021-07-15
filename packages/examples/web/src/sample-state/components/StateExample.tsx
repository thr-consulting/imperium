import React from 'react';
import debug from 'debug';
import {useDispatch} from 'react-redux';
import {formatDate} from '@thx/date';
import {LocalDatePicker} from '@thx/controls';
import {useSampleState, actions} from '../state';

const d = debug('imperium.examples.web.sample-state.StateExample');

export default function StateExample() {
	const state = useSampleState();
	const dispatch = useDispatch();

	d(state);

	return (
		<>
			<h1>State Example</h1>
			<p>TheDate: {formatDate(state.date)}</p>
			<p>Raw state: {state.date}</p>
			<LocalDatePicker
				value={state.date}
				onChange={v => {
					d(v, actions.setDate(v));
					dispatch(actions.setDate(v));
				}}
			/>
		</>
	);
}
