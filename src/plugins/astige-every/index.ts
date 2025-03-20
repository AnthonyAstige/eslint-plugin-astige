import markdown from "@eslint/markdown";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { WARN } from "../../severityConstants.js";
import type { PluginConfigs } from "../../sharedTypes.js";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile.js";

const PLUGIN_NAME = "astige-every";
const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const astigeEveryPlugin: FlatConfig.Plugin = { rules: rules };
const astigeEveryConfigs: PluginConfigs<[typeof PLUGIN_NAME], typeof rules> = [
  // TODO: Make work work all file types with a fallback token count
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
          md: 3_000,
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
          json: 3_000,
          js: 2_000,
          jsx: 2_000,
          ts: 2_000,
          tsx: 2_000,
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
