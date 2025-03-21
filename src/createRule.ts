import { ESLintUtils } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  // TODO 3. Move to rule specific documentation urls
  // TODO 3. * Something like https://example.com/rule/${name}
  // TODO 3. * Will need to move away from plugin level docs to rule level docs for this
  (_name) => `https://github.com/AnthonyAstige/eslint-plugin-astige`,
);

export { createRule };
