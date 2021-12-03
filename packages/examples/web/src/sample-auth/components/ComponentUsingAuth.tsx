import {useAuth, useLogout, IAuthContext, useAuthId} from '@imperium/auth-client';
import {AbstractAuthSelector, AuthLevel} from '@imperium/authorization';
import debug from 'debug';
import React, {useEffect, useRef} from 'react';
import {Button} from 'semantic-ui-react';
import {useLazyAuth} from '@imperium/auth-client/src';

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

class MySelector extends AbstractAuthSelector {
	private readonly word: string;

	constructor(word: string) {
		super();
		this.word = word;
	}

	async getLevel(ctx: IAuthContext) {
		if (ctx.auth?.id) return AuthLevel.fromString('admin.system.99');
		return AuthLevel.nullLevel();
	}

	public getCacheId() {
		return this.word;
	}

	public getName() {
		return 'MySelector';
	}
}

export default function ComponentUsingAuth() {
	const thingSelector = new MySelector('thing');
	const otherSelector = new MySelector('other');

	const thingAuth = useAuth(thingSelector);
	const otherAuth = useAuth(otherSelector);
	// const [startAuth, res] = useLazyAuth(new MySelector('newthing'));

	// useTraceUpdate({loading, id, level, hasAccess});
	// useTraceUpdate(res);

	d(thingAuth.level.toString());
	d(otherAuth.level.toString());

	return (
		<>
			<h1>Component Using Auth</h1>
			{/* <p>ID: {res.id}</p> */}
			{/* <p> */}
			{/*	Loading: {loading ? 'true' : 'false'} */}
			{/*	<br /> */}
			{/*	Level: {level.toString()} */}
			{/* </p> */}
			{/* <p> */}
			{/*	Lazy Loading: {res.loading ? 'true' : 'false'} */}
			{/*	<br /> */}
			{/*	Lazy Called: {res.called ? 'true' : 'false'} */}
			{/*	<br /> */}
			{/*	Lazy Level: {res.level.toString()} */}
			{/* </p> */}
			{/* <Button */}
			{/*	color="orange" */}
			{/*	onClick={() => { */}
			{/*		startAuth(); */}
			{/*	}} */}
			{/* > */}
			{/*	Lazy auth */}
			{/* </Button> */}
		</>
	);
}

/*
// const [startAuth, res] = useLazyAuth(new MySelector('newthing'));
	// const {access} = useAuthId();
	const logout = useLogout();

	// useTraceUpdate({loading, id, level, access});

	if (loading) return null;
	// if (!called) return <Button onClick={() => getAuth()}>Start Auth</Button>;

	return (
		<>
			<h1>Component Using Auth</h1>
			<p>
				ID: {id}
				<br />
				Access Token: {access}
			</p>
			<p>
				Loading: {loading ? 'true' : 'false'}
				<br />
				Level: {level.toString()}
				<br />
				Has Access to admin: {hasAccess(AuthLevel.fromString('manager.system.50')).exec() ? 'Yes' : 'No'}
			</p>
			<p>
				Lazy Loading: {res.loading ? 'true' : 'false'}
				<br />
				Lazy Called: {res.called ? 'true' : 'false'}
				<br />
				Lazy Level: {res.level.toString()}
			</p>
			<Button
				color="blue"
				onClick={async () => {
					await logout();
				}}
			>
				Logout
			</Button>
			<Button
				color="orange"
				onClick={() => {
					startAuth();
				}}
			>
				Lazy auth
			</Button>
		</>
	);
*/
