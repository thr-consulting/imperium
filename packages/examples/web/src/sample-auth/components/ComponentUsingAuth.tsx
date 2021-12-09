import {useAuth, useLogout} from '@imperium/auth-client';
import debug from 'debug';
import React, {useEffect, useRef} from 'react';
import {Button} from 'semantic-ui-react';

const d = debug('imperium.examples.web.sample-auth.components.ComponentUsingAuth');

function useTraceUpdate(props: any) {
	const prev = useRef(props);
	useEffect(() => {
		const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
			if (prev.current[k] !== v) {
				// eslint-disable-next-line no-param-reassign
				ps[k] = [prev.current[k], v];
			}
			return ps;
		}, {} as Record<string, any>);
		if (Object.keys(changedProps).length > 0) {
			d('Changed props:', changedProps);
		}
		prev.current = props;
	});
}

export default function ComponentUsingAuth() {
	const logout = useLogout();
	const {authorization} = useAuth();

	return (
		<>
			<h1>Component Using Auth</h1>
			<p>ID: {authorization.id}</p>
			<Button
				color="blue"
				onClick={async () => {
					await logout();
				}}
			>
				Logout
			</Button>
			<Button
				onClick={() => {
					authorization.can('getStuff', {thing: 'dfasfas'}).then(v => {
						d(v);
					});
				}}
			>
				Check permission
			</Button>
		</>
	);
}
