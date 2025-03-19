import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import astige from "./dist/index.js";

const config: FlatConfig.Config[] = [
  {
    files: ["src/**/*.*"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      astige,
    },
    rules: {
      ...astige.configs.recommended.rules,
    },
  },
];

export default config;
