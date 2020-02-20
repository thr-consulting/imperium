import debug from 'debug';
import {useClient} from '@imperium/client';
import {toString} from '@imperium/util';
import {LoginInfo, LoginReturn} from './types';
import {postJson} from './fetch';
import {useAuth} from './useAuth';

const d = debug('imperium.auth-client.useLogin');

export function useLogin(): (loginInfo: LoginInfo) => Promise<void> {
	const client = useClient();
	const auth = useAuth();

	return async (loginInfo: LoginInfo) => {
		// Send a POST request to login
		const info = (await postJson(toString(client?.globalConst.authLoginUrl), loginInfo)) as LoginReturn;
		// Set the id and access token in React context
		auth.setAuth({id: info.id, access: info.access});
		// Save id and access token to localstorage
		localStorage.setItem('id', info.id);
		localStorage.setItem('access', info.access);
	};
}
