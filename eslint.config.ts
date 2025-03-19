import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import astige from "./dist/index.js";

const config: FlatConfig.Config[] = [
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      astige,
    },
    rules: {
      "astige/no-tsx-without-jsx": "error",
      "astige/no-import-as": "error",
    },
  },
];

export default config;
