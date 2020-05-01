"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;
exports.stop = stop;

var _server = require("./server");

async function main() {
  return _server.server.start({
    port: parseInt(process.env.port || '4001', 10)
  });
}

async function stop() {
  return _server.server.stop();
}
//# sourceMappingURL=index.js.map