import React from 'react';
import {AuthContext} from '@imperium/context';

interface Props {
	children: (children: JSX.Element) => JSX.Element,
}

export default function AuthContextConsumer(props: Props) {
	return (
		<AuthContext.Consumer>
			{children => props.children(children)}
		</AuthContext.Consumer>
	);
}
