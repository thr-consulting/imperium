"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoSeverModule = void 0;

var _debug = _interopRequireDefault(require("debug"));

const d = (0, _debug.default)('imperium.test-new-context.server.todo');
const todoSeverModule = {
  name: 'Todo',

  async startup(server, context) {
    // do whatever startup you need in here.
    // make sure you pass the correct context into your domain methods.
    // eslint-disable-next-line no-console
    d("running todo's server module startup method. Contexts:", Object.keys(context));
  },

  resolvers(server) {
    return {
      Query: {
        someQuery(source, query, context) {
          return context.todoDomain.context.Todo.create({
            complete: true,
            title: 'finish ts for imperium graphql server module'
          }, context.todoDomain);
        }

      }
    };
  },

  schema: `
			type Todo {
				title: String
				complete: Boolean
			}
			extend type Query {
				someQuery: Todo
			}
		`
};
exports.todoSeverModule = todoSeverModule;
//# sourceMappingURL=todo.js.map