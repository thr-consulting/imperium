"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;

var _contextManager = require("@imperium/context-manager");

var _debug = _interopRequireDefault(require("debug"));

var _todo = require("./todo");

const d = (0, _debug.default)('imperium.test-new-context.domain');

function createContext(connector) {
  return new _contextManager.ContextManager({
    Todo: conn => {
      return _todo.Todo;
    }
  }, connector);
}
//# sourceMappingURL=index.js.map