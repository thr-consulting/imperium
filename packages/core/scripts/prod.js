/* eslint-disable no-console */
const path = require('path');

const server = require(path.join(process.cwd(), 'build', 'index.js')).default; // eslint-disable-line import/no-dynamic-require

console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
console.log('  Imperium Framework - Prod');
console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');

server();
