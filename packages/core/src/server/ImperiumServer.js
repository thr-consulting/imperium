"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const isFunction_1 = __importDefault(require("lodash/isFunction"));
const contextMiddleware_1 = __importDefault(require("./contextMiddleware"));
const Context_1 = __importDefault(require("./Context"));
const d = debug_1.default('imperium.core.server');
class ImperiumServer {
    constructor(options) {
        this._connectors = options.connectors;
        // Load module definitions
        this._serverModules = options.serverModules.map(moduleFunc => {
            const moduleDefinition = moduleFunc();
            d(`Loading server module: ${moduleDefinition.name || 'unnamed module'}`);
            return moduleDefinition;
        });
    }
    async start() {
        d('Creating connectors');
        await this._connectors.create();
        d('Starting express app');
        // Create express app
        const app = express_1.default();
        // Module middleware
        d('Creating module middleware');
        const middlewares = this._serverModules.reduce((memo, module) => {
            if (module.middleware && isFunction_1.default(module.middleware)) {
                return {
                    ...memo,
                    ...module.middleware(),
                };
            }
            return memo;
        }, {
            contextMiddleware: contextMiddleware_1.default,
        });
        // Module endpoints
        d('Creating module endpoints');
        this._serverModules.forEach(module => {
            if (module.endpoints && isFunction_1.default(module.endpoints))
                module.endpoints({
                    app,
                    connectors: this._connectors,
                    modules: this._serverModules,
                    middlewares,
                });
        });
        // Create server startup Context
        d('Creating initial context');
        const context = new Context_1.default(this._connectors);
        this._serverModules.forEach(module => {
            if (module.models && isFunction_1.default(module.models))
                context.addModels(module.models);
        });
        app.listen(process.env.PORT || 4001, () => {
            // console.log(`  PID ${process.pid} listening on port ${process.env.PORT || 4000}`);
        });
        return this;
    }
    async stop() {
        d('Closing connectors');
        this._connectors.close();
    }
}
exports.default = ImperiumServer;
