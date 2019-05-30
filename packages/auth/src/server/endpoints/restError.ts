import get from 'lodash/get';

function getError(code) {
	switch (code) {
		case 400: return 'Bad Request';
		case 401: return 'Unauthorized';
		case 403: return 'Forbidden';
		case 404: return 'Not Found';
		case 500:
		default:
			return 'Internal Server Error';
	}
}

export default function restError(err, res) {
	const httpStatusCode = get(err, 'httpStatusCode', 500);
	const statusCode = get(err, 'extensions.code', 'INTERNAL_SERVER_ERROR');
	const message = err.toString();

	res.status(httpStatusCode).json({
		statusCode,
		error: getError(httpStatusCode),
		message,
	});
}
