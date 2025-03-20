import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

export const noExportAs = ESLintUtils.RuleCreator(
  () => `https://github.com/AnthonyAstige/eslint-plugin-no-named-export-alias`,
)({
  name: "no-export-as",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow using 'as' keyword in export statements",
    },
    messages: {
      noExportAs: "Avoid using 'as' in export statements. Use direct named exports instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportSpecifier(node: TSESTree.ExportSpecifier) {
        const exportedName = node.exported.type === "Identifier"
          ? node.exported.name
          : node.exported.value;

        const localName = node.local.type === "Identifier"
          ? node.local.name
          : node.local.value;

        if (exportedName !== localName) {
          context.report({
            node,
            messageId: "noExportAs",
          });
        }
      },
    };
  },
});
