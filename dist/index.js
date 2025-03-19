"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = exports.recommended = void 0;
const ftaComplexity_1 = require("./rules/ftaComplexity");
const maxTokensPerFile_1 = require("./rules/maxTokensPerFile");
const noImportAs_1 = require("./rules/noImportAs");
const noTsxWithoutJsx_1 = require("./rules/noTsxWithoutJsx");
const SEVERITY = {
    OFF: 0,
    WARN: 1,
    ERROR: 2,
};
const PLUGIN_NAME = "astige";
exports.recommended = {
    rules: {
        [`${PLUGIN_NAME}/fta-complexity-could-be-better`]: [
            SEVERITY.WARN,
            { "when-above": 55, "when-at-or-under": 75 },
        ],
        [`${PLUGIN_NAME}/fta-complexity-needs-improvement`]: [
            SEVERITY.ERROR,
            { "when-above": 75 },
        ],
        [`${PLUGIN_NAME}/max-tokens-per-file`]: [
            SEVERITY.WARN,
            {
                js: 2000,
                ts: 2000,
                tsx: 2000,
            },
        ],
        [`${PLUGIN_NAME}/no-import-as`]: SEVERITY.ERROR,
        [`${PLUGIN_NAME}/no-tsx-without-jsx`]: SEVERITY.ERROR,
    },
};
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
exports.configs = {
    recommended: exports.recommended,
};
//# sourceMappingURL=index.js.map