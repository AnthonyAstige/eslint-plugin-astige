import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
// import auto from "eslint-config-canonical/configurations/auto";
import { globalIgnores } from "eslint/config";
import * as astige from "./src/index.ts";

const configs: FlatConfig.Config[] = [
  // TODO: get away from languageOptions once canonical auto is in
  {
    languageOptions: {
      parser: typescriptParser,
    },
  },
  // Custom ignores for this specific project
  globalIgnores([
    "dist",
    "docs/generated-create-eslint-plugin-instructions.md",
  ]),
  ...astige.auto,
];

export default configs;
