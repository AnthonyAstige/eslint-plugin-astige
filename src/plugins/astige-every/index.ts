import markdown from "@eslint/markdown";
import importPlugin from "eslint-plugin-import";
import { ERROR, OFF, WARN } from "../../severityConstants.js";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile.js";

import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const MAX_TEXT_TOKENS = 3_000;
const MAX_CODE_TOKENS = 2_000;

const PLUGIN_NAME = "astige-every";
const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const astigeEveryPlugin: FlatConfig.Plugin = { rules };
// const astigeEveryConfigs: PluginConfigs<[typeof PLUGIN_NAME], typeof rules> = [
const astigeEveryConfigs: FlatConfig.Config[] = [
  // TODO 1. Make work work all file types with a fallback token count
  // TODO 1. * May need a custom parser
  {
    files: ["**/*.md"],
    language: "markdown/commonmark",
    plugins: {
      markdown,
      [PLUGIN_NAME]: astigeEveryPlugin,
    },
    rules: {
      "astige-every/max-tokens-per-file": [
        WARN,
        {
          md: MAX_TEXT_TOKENS,
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,json}"],
    plugins: { [PLUGIN_NAME]: astigeEveryPlugin },
    rules: {
      "astige-every/max-tokens-per-file": [
        WARN,
        {
          js: MAX_CODE_TOKENS,
          json: MAX_TEXT_TOKENS,
          jsx: MAX_CODE_TOKENS,
          ts: MAX_CODE_TOKENS,
          tsx: MAX_CODE_TOKENS,
        },
      ],
      "no-warning-comments": [
        WARN,
        {
          // Single warn syntax so low priority reminders like `TODO 1.` can remain
          terms: ["TODO:"],
        },
      ],
    },
  },
  // TODO: Move all of this stuff out of the every config ; these rules are not really meant for everything ; I need to get organized
  // TODO: * And when done put back the above PluginConfigs
  {
    files: ["**/*.json"],
    rules: {
      "jsonc/no-comments": OFF,
    },
  },
  {
    // Disable formatting capability for eslint (use dprint instead for performance even over prettier)
    // * https://old.reddit.com/r/neovim/comments/1f44u1a/eslint_performance_compared_to_vscode_lspeslint/llmhn47/
    // * https://typescript-eslint.io/users/what-about-formatting/#suggested-usage---prettier
    // * https://news.ycombinator.com/item?id=31160722
    files: ["**/*"],
    rules: {
      "jsonc/array-bracket-newline": OFF,
      "jsonc/array-element-newline": OFF,
      "perfectionist/sort-imports": OFF,
      "prettier/prettier": OFF,
    },
  },
  // Disable or adjust slow rules
  // * Found via `TIMING=1 npx eslint`
  {
    plugins: {
      // TODO: Ensure this is correct / fix back to "import/[rule-name]" override everywhere?
      // TODO: * Before I had this named "import" in an attempt to override import from canonical's auto config
      // TODO: ** Not sure if everything was working as intended even
      import: importPlugin,
    },
  },
  {
    files: ["**/*"],
    rules: {
      "@typescript-eslint/no-deprecated": OFF,
      "import/no-cycle": [
        ERROR,
        {
          ignoreExternal: true,
        },
      ],
      "import/no-deprecated": OFF,
    },
  },
];

export { astigeEveryConfigs, astigeEveryPlugin };
