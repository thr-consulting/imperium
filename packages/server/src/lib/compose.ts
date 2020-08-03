import type {RequestHandler} from 'express';

/**
 * Combine express middleware into a single middleware.
 * @param middleware
 */
export function compose(middleware: RequestHandler | RequestHandler[]): RequestHandler {
	if (!(middleware instanceof Array)) {
		return middleware;
	}

	if (middleware.length === 0) {
		return (req, res, next) => {
			next();
		};
	}

	const head = middleware[0];
	const tail = middleware.slice(1);

	return (req, res, next) => {
		head(req, res, (err: any) => {
			if (err) return next(err);
			return compose(tail)(req, res, next);
		});
	};
}
