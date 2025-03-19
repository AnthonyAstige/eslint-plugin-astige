import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

export const noImportAs = ESLintUtils.RuleCreator(
  () => `https://github.com/AnthonyAstige/eslint-plugin-no-named-import-alias`,
)({
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
      ImportSpecifier(node: TSESTree.ImportSpecifier) {
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
