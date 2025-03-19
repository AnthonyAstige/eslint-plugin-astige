"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noImportAs = void 0;
const utils_1 = require("@typescript-eslint/utils");
exports.noImportAs = utils_1.ESLintUtils.RuleCreator(() => `https://github.com/AnthonyAstige/eslint-plugin-no-named-import-alias`)({
    name: "no-import-as",
    meta: {
        type: "suggestion",
        docs: {
            description: "Disallow using 'as' keyword in import statements",
        },
        messages: {
            noImportAs: "Avoid using 'as' in import statements. Use direct named imports instead.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            ImportSpecifier(node) {
                const importedName = node.imported.type === "Identifier"
                    ? node.imported.name
                    : node.imported.value;
                if (importedName !== node.local.name) {
                    context.report({
                        node,
                        messageId: "noImportAs",
                    });
                }
            },
        };
    },
});
//# sourceMappingURL=noImportAs.js.map