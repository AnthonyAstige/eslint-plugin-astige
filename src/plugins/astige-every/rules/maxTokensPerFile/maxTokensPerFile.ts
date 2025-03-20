import { type TSESLint } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import fs from "fs";
import { encode } from "gpt-tokenizer/model/gpt-4o";

type MaxTokensConfig = {
  [key: string]: number;
};
function shouldReport(
  context: RuleContext<"maxTokens", [MaxTokensConfig]>,
  sourceText: string,
) {
  const encodedTokens = encode(sourceText);
  const tokenCount = encodedTokens.length;
  const { options } = context;
  const [maxTokensConfig] = options;
  const fileType = context.filename.split(".").pop();
  if (!fileType) {
    return false;
  }
  const maxTokens = maxTokensConfig[fileType];
  if (!maxTokens) {
    return false;
  }
  return (tokenCount > maxTokens);
}

export const maxTokensPerFile: TSESLint.RuleModule<
  "maxTokens",
  [MaxTokensConfig]
> = {
  create(context) {
    const { options } = context;
    const [maxTokensConfig] = options;
    const fileType = context.filename.split(".").pop();

    if (!fileType) {
      return {};
    }

    const maxTokens = maxTokensConfig[fileType];

    if (fileType === "md") {
      const maxTokens = maxTokensConfig[fileType];
      const sourceText = fs.readFileSync(context.filename, "utf8");

      const encodedTokens = encode(sourceText);
      const tokenCount = encodedTokens.length;

      if (shouldReport(context, sourceText)) {
        // Use the Program node from the AST for reporting
        context.report({
          data: {
            fileType,
            maxTokens: String(maxTokens),
            tokenCount: tokenCount.toString(),
          },
          messageId: "maxTokens",
          node: context.sourceCode.ast,
        });
      }
    }

    return {
      Program(node) {
        const sourceText = context.sourceCode.getText(node);
        const encodedTokens = encode(sourceText);
        const tokenCount = encodedTokens.length;
        if (shouldReport(context, sourceText)) {
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
  defaultOptions: [{}],
  meta: {
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
    type: "suggestion",
  },
};
