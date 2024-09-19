import {
	authorizationHeader,
	renewToken,
	useAccessToken,
	useAuthenticatedState,
	useAuthorization,
	useFetch,
	useLogin,
	useLogout,
} from '@imperium/auth-client';
import debug from 'debug';
import {decodeJwt, SignJWT} from 'jose';
import {useEffect, useRef, useState} from 'react';
import {Button, Input, Segment} from 'semantic-ui-react';
import {useDispatch} from 'react-redux';
import sha256 from '@thx/sha256';
import {TestMutation} from '../../sample-graphql/components/TestMutation';

const d = debug('imperium.web.sample-auth.components.ComponentUsingAuth');

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

const formatDate = (timestamp?: number) => {
	if (!timestamp) return 'n/a';
	const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
	return date.toLocaleString(); // Default locale and options
};

export default function ComponentUsingAuth() {
	const dispatch = useDispatch();
	const logout = useLogout();
	const login = useLogin();
	const {id} = useAuthenticatedState();
	const {token} = useAccessToken();
	const authorization = useAuthorization();
	const [serverSecret, setServerSecret] = useState(window.localStorage.getItem('secret'));
	const fetch = useFetch();

	let payloadText = '';
	try {
		if (token) {
			const payload = decodeJwt(token);
			payloadText = JSON.stringify(
				{
					...payload,
					iat: formatDate(payload.iat),
					exp: formatDate(payload.exp),
				},
				null,
				2,
			);
		}
	} catch (err) {
		payloadText = 'invalid token';
	}

	return (
		<>
			<h1>Component Using Auth</h1>
			<Segment>
				<pre>
					ID: <b>{authorization.extra?.auth?.id}</b>
					<br />
					Token: <b>{payloadText}</b>
				</pre>
			</Segment>
			<Segment basic>
				<Button
					color="blue"
					onClick={async () => {
						await login({
							identifier: 'john@example.com',
							password: {
								digest: sha256('password'),
								algorithm: 'sha-256',
							},
						});
					}}
				>
					Login
				</Button>
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
						authorization
							.can(
								[
									{permission: 'getStuff', data: {thing: 'dfasfas'}},
									{permission: 'getStuff', data: {thing: 'second'}},
								],
								'OR',
							)
							.then(v => {
								d('stuff', v);
							});
						authorization.can('getMore').then(v => {
							d('more', v);
						});
						authorization.can({permission: 'getPing', data: {force: true}}).then(v => {
							d('ping', v);
						});
						authorization.can({permission: 'getLoc', data: {force: false}}).then(v => {
							d('loc', v);
						});
					}}
				>
					Check permission
				</Button>
				<Button
					onClick={() => {
						fetch('http://localhost:4001/express', {
							method: 'POST',
							mode: 'cors',
							credentials: 'include',
							headers: authorizationHeader(localStorage.getItem('access')),
						})
							.then(res => {
								return res.json();
							})
							.then(data => {
								d(data);
							});
					}}
				>
					REST
				</Button>
				<Button
					onClick={() => {
						authorization.clearCache(id).catch(err => d(err));
					}}
				>
					Clear Auth
				</Button>
				<TestMutation />
			</Segment>
			<Segment basic>
				Access token secret:
				<Input
					value={serverSecret}
					onChange={(ev, {value}) => {
						setServerSecret(value);
					}}
				/>
			</Segment>
			<Segment basic>
				<Button
					onClick={() => {
						const a = new SignJWT({id});
						const b = new Date();
						b.setMinutes(b.getMinutes() - 5);
						a.setExpirationTime(b);
						a.setIssuedAt(b);
						a.setProtectedHeader({alg: 'HS256'});
						a.sign(new TextEncoder().encode(serverSecret || '')).then(tok => {
							window.localStorage.setItem('access', tok);
							dispatch(renewToken(tok));
						});
					}}
				>
					Set expired token
				</Button>
				<Button
					onClick={() => {
						const a = new SignJWT({id});
						const b = new Date();
						b.setSeconds(b.getSeconds() + 6); // have to take grace period into account
						a.setExpirationTime(b);
						a.setIssuedAt(b);
						a.setProtectedHeader({alg: 'HS256'});
						a.sign(new TextEncoder().encode(serverSecret || '')).then(tok => {
							window.localStorage.setItem('access', tok);
							dispatch(renewToken(tok));
						});
					}}
				>
					Set almost expired token
				</Button>
				<Button
					onClick={() => {
						const a = new SignJWT({id});
						const b = new Date();
						b.setMinutes(b.getMinutes() + 100);
						a.setExpirationTime(b);
						a.setIssuedAt(b);
						a.setProtectedHeader({alg: 'HS256'});
						a.sign(new TextEncoder().encode(serverSecret || '')).then(tok => {
							window.localStorage.setItem('access', tok);
							dispatch(renewToken(tok));
						});
					}}
				>
					Set valid token
				</Button>
				<Button
					onClick={() => {
						window.localStorage.setItem('access', 'invalidtoken');
						dispatch(renewToken('invalid'));
					}}
				>
					Set invalid token
				</Button>
				<Button
					onClick={() => {
						window.localStorage.setItem('access', '');
						dispatch(renewToken(''));
					}}
				>
					Clear token
				</Button>
			</Segment>
		</>
	);
}
