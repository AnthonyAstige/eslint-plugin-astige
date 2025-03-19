"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxTokensPerFile = void 0;
const gpt_4o_1 = require("gpt-tokenizer/esm/model/gpt-4o");
// Type guard to validate options matches MaxTokensConfig
function isMaxTokensConfig(obj) {
    return (typeof obj === "object"
        && obj !== null
        && Object.values(obj).every(val => typeof val === "number"));
}
exports.maxTokensPerFile = {
    create(context) {
        const { sourceCode } = context;
        const fileType = context.filename.split(".").pop();
        if (!fileType) {
            return {};
        }
        const options = context.options[0];
        if (!isMaxTokensConfig(options)) {
            return {};
        }
        const maxTokensConfig = options;
        const maxTokens = maxTokensConfig[fileType];
        if (!maxTokens) {
            return {};
        }
        return {
            Program(node) {
                const sourceText = sourceCode.getText(node);
                const encodedTokens = (0, gpt_4o_1.encode)(sourceText);
                const tokenCount = encodedTokens.length;
                if (tokenCount > maxTokens) {
                    context.report({
                        data: {
                            fileType,
                            maxTokens: String(maxTokens),
                            tokenCount: tokenCount.toString(),
                        },
                        messageId: "maxTokens",
                        node,
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            category: "Best Practices",
            description: "Enforce a maximum number of tokens per file type to keep files manageable by LLMS (quicker to output entire files when edits made)",
            recommended: false,
        },
        messages: {
            maxTokens: "File exceeds the maximum allowed tokens of {{maxTokens}} for .{{fileType}} files. Token count: {{tokenCount}}",
        },
        schema: [
            {
                additionalProperties: {
                    type: "number",
                },
                type: "object",
            },
        ],
        type: "suggestion",
    },
};
