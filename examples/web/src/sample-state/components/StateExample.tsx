import {LocalDate} from '@js-joda/core';
import {LocalDatePicker} from '@thx/controls';
import {formatDate} from '@thx/date';
import debug from 'debug';
import {useDispatch} from 'react-redux';
import {setDate, useSampleState} from '../state';

const d = debug('imperium.examples.web.sample-state.components.StateExample');

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
