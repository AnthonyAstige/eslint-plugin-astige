import { type FlatConfig, type SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { WARN } from "../../severityConstants";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";

const rules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const PLUGIN_NAME = "astige-every";
type PrefixedRuleName = `${typeof PLUGIN_NAME}/${keyof typeof rules}`;
type RuleEntryObject = {
  [K in PrefixedRuleName]: SharedConfig.RuleEntry;
};

const ruleConfigs: RuleEntryObject = {
  "astige-every/max-tokens-per-file": [
    WARN,
    {
      js: 2_000,
      ts: 2_000,
      tsx: 2_000,
    },
  ],
};

export const astigeEveryPlugin: FlatConfig.Plugin = { rules: rules };
// TODO: Setup no-op parser and make work in this config
export const astigeEveryConfig: FlatConfig.Config & { rules: RuleEntryObject } = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME]: astigeEveryPlugin },
  rules: ruleConfigs,
};
