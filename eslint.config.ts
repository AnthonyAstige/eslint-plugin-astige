import typescriptParser from "@typescript-eslint/parser";
import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
// import auto from "eslint-config-canonical/configurations/auto";
import { globalIgnores } from "eslint/config";
import * as astige from "./src";

const configs: FlatConfig.Config[] = [
  // TODO: get away from languageOptions once canonical auto is in
  {
    languageOptions: {
      parser: typescriptParser,
    },
  },
  // Custom ignores for this specific project
  globalIgnores([
    "tests/", // TODO: Fix so tests will get eslint treatment
    "eslint.config.ts", // TODO 1. Fix so this file is linted too ; was trouble making work with typescriptParser (because this isn't under src which is our main tsconfig bundling)
    "dist",
    "docs/generated-create-eslint-plugin-instructions.md",
  ]),
  ...astige.auto,
];

export default configs;
