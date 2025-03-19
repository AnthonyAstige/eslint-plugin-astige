"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const ftaComplexity_1 = require("./rules/ftaComplexity");
const maxTokensPerFile_1 = require("./rules/maxTokensPerFile");
const noImportAs_1 = require("./rules/noImportAs");
const noTsxWithoutJsx_1 = require("./rules/noTsxWithoutJsx");
exports.rules = {
    "no-tsx-without-jsx": noTsxWithoutJsx_1.noTsxWithoutJsx,
    "no-import-as": noImportAs_1.noImportAs,
    "max-tokens-per-file": maxTokensPerFile_1.maxTokensPerFile,
    "fta-complexity-could-be-better": ftaComplexity_1.ftaComplexityCouldBeBetter,
    "fta-complexity-needs-improvement": ftaComplexity_1.ftaComplexityNeedsImprovement,
};
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Remove all use from my repo, remove local instances of them, ...
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
//# sourceMappingURL=index.js.map