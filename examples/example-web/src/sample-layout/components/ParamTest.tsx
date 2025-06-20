import debug from 'debug';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Input} from 'semantic-ui-react';
import type {routes} from '../routes';
import {setText, useLayoutState} from '../state';

const d = debug('imperium.example-web.sample-layout.components.ParamTest');

export function ParamTest() {
	const dispatch = useDispatch();
	const {myParam} = useParams<typeof routes.types.withParam>();
	const {id, text} = useLayoutState();
	return (
		<>
			<h3>test</h3>
			<div>Route param: {myParam}</div>
			<div>State id: {id}</div>
			<div>State text: {text}</div>
			<Input
				onChange={(ev, data) => {
					dispatch(setText(data.value));
				}}
				value={text}
			/>
		</>
	);
}
