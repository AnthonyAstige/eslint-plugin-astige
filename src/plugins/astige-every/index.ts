import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { WARN } from "../../severityConstants";
import { PluginConfig } from "../../sharedTypes";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";

const PLUGIN_NAME = "astige-every";
const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const astigeEveryPlugin: FlatConfig.Plugin = { rules: rules };
const astigeEveryConfig: PluginConfig<[typeof PLUGIN_NAME], typeof rules> = {
  plugins: { [PLUGIN_NAME]: astigeEveryPlugin },
  rules: {
    "astige-every/max-tokens-per-file": [
      WARN,
      {
        js: 2_000,
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
};

export { astigeEveryConfig, astigeEveryPlugin };
