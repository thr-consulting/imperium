/* eslint-disable no-console */
const path = require('path');
const config = require('../config');

const server = require(path.join(process.cwd(), config.production.buildDir, 'index.js')).default; // eslint-disable-line import/no-dynamic-require

console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
console.log('  Imperium Framework - Prod');
console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');

server();
