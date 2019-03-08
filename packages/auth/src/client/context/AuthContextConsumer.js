import React from 'react';
import {Context} from './context';

export default function AuthContextConsumer(props) {
	return (
		<Context.Consumer>
			{a => {
				return props.children(a);
			}}
		</Context.Consumer>
	);
}
