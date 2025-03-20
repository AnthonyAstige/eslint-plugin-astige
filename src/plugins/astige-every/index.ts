import markdown from "@eslint/markdown";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { WARN } from "../../severityConstants.js";
import type { PluginConfigs } from "../../sharedTypes.js";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile.js";

const MAX_TEXT_TOKENS = 3_000;
const MAX_CODE_TOKENS = 2_000;

const PLUGIN_NAME = "astige-every";
const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const astigeEveryPlugin: FlatConfig.Plugin = { rules: rules };
const astigeEveryConfigs: PluginConfigs<[typeof PLUGIN_NAME], typeof rules> = [
  // TODO 1. Make work work all file types with a fallback token count
  // TODO 1. * May need a custom parser
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
      [PLUGIN_NAME]: astigeEveryPlugin,
    },
    language: "markdown/commonmark",
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
          json: MAX_TEXT_TOKENS,
          js: MAX_CODE_TOKENS,
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
];

export { astigeEveryConfigs, astigeEveryPlugin };
