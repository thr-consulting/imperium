import debug from 'debug';
import React from 'react';
import Links from './Links';

const d = debug('app.sample.DefaultComponent');

export default function DefaultComponent() {
	return (
		<>
			<h1>Home</h1>
			<Links />
		</>
	);
}
