"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const debug_1 = __importDefault(require("debug"));
const Root_1 = __importDefault(require("./components/Root"));
const d = debug_1.default('imperium.core.client');
class ImperiumClient {
    constructor(options) {
        this._clientModules = options.clientModules.map(moduleFunc => {
            const moduleDefinition = moduleFunc();
            d(`Loading client module: ${moduleDefinition.name || 'unnamed module'}`);
            return moduleDefinition;
        });
    }
    start() {
        react_dom_1.render(react_1.default.createElement(Root_1.default, null), document.getElementById('root'));
    }
}
exports.default = ImperiumClient;
