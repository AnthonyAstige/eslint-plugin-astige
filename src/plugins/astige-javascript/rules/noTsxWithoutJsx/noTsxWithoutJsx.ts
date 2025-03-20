import { type TSESLint } from '@typescript-eslint/utils';

export const noTsxWithoutJsx: TSESLint.RuleModule<'noJsxInTsx', []> = {
  create(context) {
    const filename = context.filename;
    if (!filename.endsWith('.tsx')) {
      return {};
    }

    let containsJSX = false;

    return {
      JSXElement() {
        containsJSX = true;
      },
      JSXFragment() {
        containsJSX = true;
      },
      'Program:exit'(node) {
        if (!containsJSX) {
          const sourceCode = context.sourceCode;
          const firstToken = sourceCode.getFirstToken(node);
          if (firstToken) {
            context.report({
              loc: firstToken.loc,
              messageId: 'noJsxInTsx',
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Disallow .tsx files without JSX',
    },
    messages: {
      noJsxInTsx:
        'This file has a .tsx extension but does not contain any JSX elements.',
    },
    schema: [],
    type: 'problem',
  },
};
