import { TSESTree } from "@typescript-eslint/utils";
import type { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import fs from "fs";
import { encode } from "gpt-tokenizer/model/gpt-4o";
import { createRule } from "../../../../createRule";

type MaxTokensConfig = {
  [key: string]: number;
};
function reportIfNeeded(
  context: RuleContext<"maxTokens", [MaxTokensConfig]>,
  node: TSESTree.Node | TSESTree.Token,
  sourceText: string,
) {
  const encodedTokens = encode(sourceText);
  const tokenCount = encodedTokens.length;
  const fileType = context.filename.split(".").pop();

  if (!fileType) {
    return;
  }

  const maxTokens = context.options[0][fileType];
  if (!maxTokens || tokenCount <= maxTokens) {
    return;
  }

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

export const maxTokensPerFile = createRule({
  create(context) {
    const fileType = context.filename.split(".").pop();

    if (fileType === "md") {
      const sourceText = fs.readFileSync(context.filename, "utf8");
      reportIfNeeded(context, context.sourceCode.ast, sourceText);
    }

    return {
      Program(node) {
        const sourceText = context.sourceCode.getText(node);
        reportIfNeeded(context, node, sourceText);
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
  name: "max-tokens-per-file",
});
