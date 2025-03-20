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
  globalIgnores([
    "dist/*",
    "package-lock.json",
  ]),
  ...astige.auto,
];

export default configs;
