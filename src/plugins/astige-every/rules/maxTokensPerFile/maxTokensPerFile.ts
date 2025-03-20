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

function report(
  context: RuleContext<"maxTokens", [MaxTokensConfig]>,
  // TODO: Fix any
  node: any,
  sourceText: string,
) {
  const encodedTokens = encode(sourceText);
  const tokenCount = encodedTokens.length;
  const fileType = context.filename.split(".").pop();
  const maxTokens = context.options[0][fileType!];

  context.report({
    data: {
      fileType: fileType!,
      maxTokens: String(maxTokens),
      tokenCount: tokenCount.toString(),
    },
    messageId: "maxTokens",
    node,
  });
}

export const maxTokensPerFile: TSESLint.RuleModule<
  "maxTokens",
  [MaxTokensConfig]
> = {
  create(context) {
    const fileType = context.filename.split(".").pop();

    if (fileType === "md") {
      const sourceText = fs.readFileSync(context.filename, "utf8");

      if (shouldReport(context, sourceText)) {
        report(context, context.sourceCode.ast, sourceText);
      }
    }

    return {
      Program(node) {
        const sourceText = context.sourceCode.getText(node);
        if (shouldReport(context, sourceText)) {
          report(context, node, sourceText);
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
