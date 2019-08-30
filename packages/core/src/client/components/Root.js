"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("react-hot-loader/root");
const react_1 = __importStar(require("react"));
function Root() {
    const [a, setA] = react_1.useState('a');
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null,
            "hello world",
            a),
        react_1.default.createElement("p", null,
            react_1.default.createElement("button", { type: "button", onClick: () => {
                    setA('b');
                } }, "push"))));
}
exports.default = root_1.hot(Root);
