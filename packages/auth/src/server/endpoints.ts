import debug from 'debug';
import refreshToken from './endpoints/refreshToken';
import initialState from './endpoints/initialState';

const d = debug('imperium.auth.endpoints');

export default function endpoints(options): void {
	d('Adding authentication endpoints');

	refreshToken(options);
	initialState(options);
}
