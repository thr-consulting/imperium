"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = void 0;

var _debug = _interopRequireDefault(require("debug"));

const d = (0, _debug.default)('imperium.test-new-context.domain.todo');
let id = 0;

class Todo {
  static create({
    title,
    complete
  }, context) {
    d('create new todo.');
    return {
      id: id++,
      title,
      complete
    };
  }

}

exports.Todo = Todo;
//# sourceMappingURL=todo.js.map