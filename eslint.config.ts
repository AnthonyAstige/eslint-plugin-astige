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
      "astige/no-import-as": astige.configs.recommended.rules["astige/no-import-as"],
      "astige/no-tsx-without-jsx": astige.configs.recommended.rules["astige/no-tsx-without-jsx"],
      "astige/max-tokens-per-file": astige.configs.recommended.rules["astige/max-tokens-per-file"],
    },
  },
];

export default config;
