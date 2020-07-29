import debug from 'debug';
import React from 'react';
import {useMutation} from '@apollo/client';
import editTodoMutation from '../graphql/editTodo.graphql';
import {Todo} from '../lib/types';

const d = debug('app.src.todo.client.components.TodoInput');

interface Props {
	value: Todo;
}

export default function TodoInput({value: {id, title, completed}}: Props) {
	const [editTodo, {data}] = useMutation<{editTodo: Todo[]}>(editTodoMutation);
	return (
		<label>
			<input type="checkbox" checked={completed} onChange={({target: {checked}}) => editTodo({variables: {id, title, completed: checked}})} />
			{title}
			<br />
		</label>
	);
}
