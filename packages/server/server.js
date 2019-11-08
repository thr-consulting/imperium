"use strict";

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./lib/server.min.js');
} else {
	module.exports = require('./lib/server.js');
}
