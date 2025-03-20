import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import { WARN } from "../../severityConstants";
import { PluginConfigs } from "../../sharedTypes";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";

const PLUGIN_NAME = "astige-every";
const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const astigeEveryPlugin: FlatConfig.Plugin = { rules: rules };
const astigeEveryConfigs: PluginConfigs<[typeof PLUGIN_NAME], typeof rules> = [{
  plugins: { [PLUGIN_NAME]: astigeEveryPlugin },
  rules: {
    "astige-every/max-tokens-per-file": [
      WARN,
      {
        // TODO: Make this work for md files also, and set a real limit
        // md: 100,
        js: 2_000,
        ts: 2_000,
        tsx: 2_000,
        // TODO: Make work work all file types with a fallback token count
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
}];

export { astigeEveryConfigs, astigeEveryPlugin };
