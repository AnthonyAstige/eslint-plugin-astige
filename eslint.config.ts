import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import astige from "./dist/index.js";

const config: FlatConfig.Config[] = [
  // TODO: See if I can get away from languageOptions? Maybe once canonical auto is in
  {
    languageOptions: {
      parser: typescriptParser,
    },
    files: ["**/*.{ts,tsx}"],
  },
  globalIgnores(["dist/*"]),
  ...astige.auto,
];

export default config;
