"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxTokensPerFile = void 0;
const gpt_4o_1 = require("gpt-tokenizer/cjs/model/gpt-4o");
exports.maxTokensPerFile = {
    defaultOptions: [{}],
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforce a maximum number of tokens per file type to keep files manageable by LLMS (quicker to output entire files when edits made)",
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
    },
    create(context) {
        const { sourceCode, options } = context;
        const [maxTokensConfig] = options;
        const fileType = context.filename.split(".").pop();
        if (!fileType || !maxTokensConfig[fileType]) {
            return {};
        }
        const maxTokens = maxTokensConfig[fileType];
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
};
