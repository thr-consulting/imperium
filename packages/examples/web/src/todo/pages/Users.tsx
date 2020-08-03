import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {User} from '../lib/types';
import getUsers from '../graphql/getUsers.graphql';

export default function Users() {
	const {loading, data} = useQuery<{getUsers: User[]}>(getUsers);
	return (
		<div>
			<h3>Uesrs</h3>
			<ul>
				{!loading && data
					? data.getUsers.map(u => (
							<li key={u.id}>
								<Link to={`/user/${u.id}`}>
									{u.firstName} {u.lastName}
								</Link>
							</li>
					  ))
					: 'No Users.'}
			</ul>
		</div>
	);
}
