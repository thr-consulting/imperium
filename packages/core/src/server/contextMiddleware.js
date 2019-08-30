"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const isFunction_1 = __importDefault(require("lodash/isFunction"));
const Context_1 = __importDefault(require("./Context"));
const d = debug_1.default('imperium.core.server.context');
/**
 * Express middleware that creates the context (data models & auth info).
 *
 * Adds .context to the req
 *
 * @param connectors
 * @param modules
 * @returns {function(*, *, *)}
 */
function contextMiddleware({ connectors, modules, }) {
    return (req, res, next) => {
        d('Creating context');
        const context = new Context_1.default(connectors); // Create a brand new instance of Context
        if (!modules)
            throw new Error('Modules are not defined');
        // Loop through each defined module and add it's data models (if any) to the context
        modules.forEach(module => {
            if (module.models && isFunction_1.default(module.models))
                context.addModels(module.models);
        });
        // Add the context object to the req
        req.context = context;
        next();
    };
}
exports.default = contextMiddleware;
