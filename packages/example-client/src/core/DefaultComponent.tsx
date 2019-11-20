import debug from 'debug';
import React from 'react';
import {Link} from 'react-router-dom';

const d = debug('app.sample.DefaultComponent');

export default function DefaultComponent() {
	return (
		<>
			<h1>Home</h1>
			<ul>
				<li>
					<Link to="/sample">Route to Sample Route</Link>
				</li>
				<li>
					<Link to="/graphqltest">Route to Graphql Test</Link>
				</li>
				<li>
					<Link to="/user">Users</Link>
				</li>
			</ul>
		</>
	);
}
