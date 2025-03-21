import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  // TODO 1. Move to rule specific documentation urls
  // TODO 1. * Something like https://example.com/rule/${name}
  (_name) => `https://github.com/AnthonyAstige/eslint-plugin-astige`,
);

export { createRule };
