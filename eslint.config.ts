import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
// import auto from "eslint-config-canonical/configurations/auto";
import { globalIgnores } from "eslint/config";
import astige from "./dist/index.js";

const config: FlatConfig.Config[] = [
  // TODO: get away from languageOptions once canonical auto is in
  {
    languageOptions: {
      parser: typescriptParser,
    },
    files: ["**/*.{ts,tsx}"],
  },
  globalIgnores([
    "dist/*",
    "package-lock.json",
  ]),
  ...astige.auto,
];

export default config;
