import { TSESLint } from "@typescript-eslint/utils";
import { encode } from "gpt-tokenizer/cjs/model/gpt-4o";

type MaxTokensConfig = {
  [key: string]: number;
};

export const maxTokensPerFile: TSESLint.RuleModule<"maxTokens", [MaxTokensConfig]> = {
  defaultOptions: [{}],
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce a maximum number of tokens per file type to keep files manageable by LLMS (quicker to output entire files when edits made)",
    },
    messages: {
      maxTokens:
        "File exceeds the maximum allowed tokens of {{maxTokens}} for .{{fileType}} files. Token count: {{tokenCount}}",
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
        const encodedTokens = encode(sourceText);
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
