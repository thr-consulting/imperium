"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../../package.json");
// import endpoints from './endpoints';
function default_1() {
    return {
        name: package_json_1.name,
        // endpoints,
        middleware: () => ({
            mymiddleware: () => { },
        }),
        endpoints: () => {
        },
    };
}
exports.default = default_1;
