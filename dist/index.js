"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const maxTokensPerFile_1 = require("./rules/maxTokensPerFile");
const noTsxWithoutJsx_1 = require("./rules/noTsxWithoutJsx");
exports.rules = {
    "no-tsx-without-jsx": noTsxWithoutJsx_1.noTsxWithoutJsx,
    "max-tokens-per-file": maxTokensPerFile_1.maxTokensPerFile,
};
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Remove all use from my repo, remove local instances of them, ...
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
//# sourceMappingURL=index.js.map