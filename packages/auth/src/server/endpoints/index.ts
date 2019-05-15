import refreshToken from './refreshToken';
import initialState from './initialState';

export default function endpoints(options): void {
	refreshToken(options);
	initialState(options);
}
