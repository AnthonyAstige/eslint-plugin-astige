import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export const noExportAs = ESLintUtils.RuleCreator(
  () => `https://github.com/AnthonyAstige/eslint-plugin-no-named-export-alias`,
)({
  create(context) {
    return {
      ExportSpecifier(node: TSESTree.ExportSpecifier) {
        const exportedName =
          node.exported.type === 'Identifier'
            ? node.exported.name
            : node.exported.value;

        const localName =
          node.local.type === 'Identifier' ? node.local.name : node.local.value;

        if (exportedName !== localName) {
          context.report({
            messageId: 'noExportAs',
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: "Disallow using 'as' keyword in export statements",
    },
    messages: {
      noExportAs:
        "Avoid using 'as' in export statements. Use direct named exports instead.",
    },
    schema: [],
    type: 'suggestion',
  },
  name: 'no-export-as',
});
