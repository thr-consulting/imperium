import 'whatwg-fetch';
import debug from 'debug';

const d = debug('imperium.auth-client.fetch');

export async function postJson(url: string, data?: object): Promise<object> {
	const options: RequestInit = {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
	};

	if (data) {
		options.body = JSON.stringify(data);
		options.headers = {
			...options.headers,
			'content-type': 'application/json',
		};
	}

	const res = await fetch(url, options);
	if (res.ok) {
		return res.json();
	}
	throw new Error(res.statusText);
}
