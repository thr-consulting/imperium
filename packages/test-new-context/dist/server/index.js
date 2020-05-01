"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.serverModules = void 0;

var _contextManager = require("@imperium/context-manager");

var _graphqlServer = require("@imperium/graphql-server");

var _server = _interopRequireDefault(require("@imperium/server"));

var _debug = _interopRequireDefault(require("debug"));

var _domain = require("../domain");

var _todo = require("./todo");

const serverModules = [_graphqlServer.graphqlServerModule, _todo.todoSeverModule];
exports.serverModules = serverModules;
const d = (0, _debug.default)('imperium.test-new-context.server'); // todo connectors should be the responsibility of the instantiating server. (in this case, the test server)

const testServerConnectors = new _contextManager.Connector({
  mongo: {
    async connect() {
      return 5;
    },

    async close() {
      d('closing test server connectors');
    }

  }
});

function contextCreator(conn) {
  return {
    todoDomain: (0, _domain.createContext)(conn),
    someOtherDomain: {}
  };
}

const server = new _server.default({
  contextCreator,
  connectors: testServerConnectors,
  serverModules
});
exports.server = server;
//# sourceMappingURL=index.js.map