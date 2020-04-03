'use strict';

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dist/server.min.js');
} else {
	module.exports = require('./dist/server.js');
}
