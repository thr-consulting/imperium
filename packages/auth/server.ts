const models = require('./lib/server/models').default;
const startup = require('./lib/server/startup').default;
const {schema, resolvers} = require('./lib/server/graphql');

module.exports = function() {
	return {
		models,
		startup,
		schema,
		resolvers,
	};
};
