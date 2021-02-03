import React, {useEffect, useRef} from 'react';
import debug from 'debug';
import {useAuth, useLogout, IAuthContext, AuthLevel, AbstractAuthSelector, useAuthId} from '@imperium/auth-client';
import {Button} from 'semantic-ui-react';

const d = debug('app.sample-auth.ComponentUsingAuth');

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
	private readonly id: string;

	constructor(id: string) {
		super();
		this.id = id;
	}

	async getLevel(ctx: IAuthContext) {
		if (ctx.auth?.id) return AuthLevel.fromString('admin.system.99');
		return AuthLevel.nullLevel();
	}

	public getCacheId() {
		return this.id;
	}
}

export default function ComponentUsingAuth() {
	const {loading, id, level, hasAccess} = useAuth(new MySelector('thing'));
	// const [getAuth, {level, loading, called, hasAccess, id}] = useLazyAuth(new MySelector('thing'));
	const {access} = useAuthId();
	const logout = useLogout();

	useTraceUpdate({loading, id, level, access});

	if (loading) return null;
	// if (!called) return <Button onClick={() => getAuth()}>Start Auth</Button>;

	return (
		<>
			<h1>Component Using Auth</h1>
			<p>ID: {id}</p>
			<p>Access Token: {access}</p>
			<p>Level: {level.name()}</p>
			<p>Has Access to admin: {hasAccess(AuthLevel.fromString('manager.system.50')) ? 'Yes' : 'No'}</p>
			<Button
				onClick={async () => {
					await logout();
				}}
			>
				Logout
			</Button>
		</>
	);
}
