import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import Moment from 'moment';
import {RouteComponentProps} from 'react-router-dom';
import TodoInput from '../components/TodoInput';
import getUser from '../graphql/getUser.graphql';
import {User, TodoHistory} from '../lib/types';

export default function Users(props: RouteComponentProps<{id: number}>) {
	const userId = props.match.params.id;
	const {loading, data} = useQuery<{getUser: User; getTodoHistory: TodoHistory[]}>(getUser, {
		variables: {id: parseInt(userId, 10)},
	});
	return (
		<div>
			{!loading && data ? (
				<>
					<h3>{data.getUser.firstName}`s Todos</h3>
					{data.getUser.todos.map(todo => (
						<TodoInput key={todo.id} value={todo} />
					))}
					<h3>{data.getUser.firstName}`s Todos History</h3>
					<table style={{borderCollapse: 'collapse'}}>
						<thead>
							<tr>
								<th style={{border: '1px solid black', padding: '.5rem'}}>Action</th>
								<th style={{border: '1px solid black', padding: '.5rem'}}>What</th>
								<th style={{border: '1px solid black', padding: '.5rem'}}>When</th>
							</tr>
						</thead>
						<tbody>
							{data.getTodoHistory.reverse().map(t => (
								<tr key={t.id}>
									<td style={{border: '1px solid black', padding: '.5rem'}}>{t.action}</td>
									<td style={{border: '1px solid black', padding: '.5rem'}}>
										<pre style={{display: 'inline'}}>
											{JSON.stringify({id: t.originalID, title: t.title, completed: t.completed})}
										</pre>
									</td>
									<td style={{border: '1px solid black', padding: '.5rem'}}>
										{Moment(new Date(t.makeActionAt)).fromNow()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<h3>Loading...</h3>
			)}
		</div>
	);
}
