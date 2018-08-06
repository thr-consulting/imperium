const path = require('path');

const server = require(path.join(process.cwd(), 'build', 'index.js')).default; // eslint-disable-line import/no-dynamic-require

server();
