"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../../package.json"));
// import endpoints from './endpoints';
function default_1() {
    return {
        name: package_json_1.default.name,
    };
}
exports.default = default_1;
