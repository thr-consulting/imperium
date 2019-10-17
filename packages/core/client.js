"use strict";

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./lib/client.min.js');
} else {
	module.exports = require('./lib/client.js');
}
