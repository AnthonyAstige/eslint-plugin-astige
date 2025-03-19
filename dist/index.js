"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const maxTokensPerFile_1 = require("./rules/maxTokensPerFile");
const noTsxWithoutJsx_1 = require("./rules/noTsxWithoutJsx");
exports.rules = {
    "no-tsx-without-jsx": noTsxWithoutJsx_1.noTsxWithoutJsx,
    "max-tokens-per-file": maxTokensPerFile_1.maxTokensPerFile,
};
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
