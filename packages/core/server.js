// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require('./lib/server');

module.exports = {
	contextMiddleware: server.contextMiddleware,
	Context: server.Context,
};
