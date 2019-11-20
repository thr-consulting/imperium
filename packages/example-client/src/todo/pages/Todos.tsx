import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Todo} from '../lib/types';
import TodoInput from '../components/TodoInput';
import getTodos from '../graphql/getTodos.graphql';

export default function Todos() {
	const {loading, data} = useQuery<{getTodos: Todo[]}>(getTodos);
	return (
		<div>
			<h3>Todos</h3>
			<ul>
				{!loading && data
					? data.getTodos.map(todo => (
							<li key={todo.id}>
								<TodoInput value={todo} />
							</li>
					  ))
					: 'No Todos.'}
			</ul>
		</div>
	);
}
