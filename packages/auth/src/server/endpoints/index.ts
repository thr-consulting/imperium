import {ImperiumServer} from '@imperium/core';
import refreshToken from './refreshToken';
import initialAuth from './initialAuth';

export default function endpoints(server: ImperiumServer): void {
	refreshToken(server);
	initialAuth(server);
}
