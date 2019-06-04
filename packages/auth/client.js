const client = require('./lib/client');

module.exports = client.default;

module.exports.AuthContextConsumer = client.AuthContextConsumer;
module.exports.AuthContextProvider = client.AuthContextProvider;
module.exports.useAuth = client.useAuth;
