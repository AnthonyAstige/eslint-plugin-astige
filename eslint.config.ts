import typescriptParser from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import noTsxWithoutJsx from "./dist/index.js";

const config: FlatConfig.Config[] = [
  {
    files: ["src/**/*.ts", "test/**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      "no-tsx-without-jsx": noTsxWithoutJsx,
    },
    rules: {
      "no-tsx-without-jsx/no-tsx-without-jsx": "error",
    },
  },
];

export default config;
