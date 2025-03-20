import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import auto from "eslint-config-canonical/configurations/auto";
import { globalIgnores } from "eslint/config";
import astige from "./dist/index.js";

const config: FlatConfig.Config[] = [
  // TODO: See if I can get away from languageOptions? Maybe once canonical auto is in
  ...auto,
  globalIgnores([
    "dist/*",
    "package-lock.json",
  ]),
  ...astige.auto,
];

export default config;
