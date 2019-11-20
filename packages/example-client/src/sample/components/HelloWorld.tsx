import React from 'react';
import {Link} from 'react-router-dom';

export default function HelloWorld() {
	return (
		<>
			<h1>Hello world</h1>
			<Link to="/">Route to Home</Link>
		</>
	);
}
