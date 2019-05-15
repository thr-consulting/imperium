import userAuthMiddleware from './userAuthMiddleware';

export default function middleware() {
	return {
		userAuthMiddleware,
	};
}
