import { type FlatConfig, type SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { WARN } from "../../severityConstants";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";

const everyRules = {
  "max-tokens-per-file": maxTokensPerFile,
};

const PLUGIN_NAME_EVERY = "astige-every";
type PrefixedEveryRuleName = `${typeof PLUGIN_NAME_EVERY}/${keyof typeof everyRules}`;
type EveryRuleEntryObject = {
  [K in PrefixedEveryRuleName]: SharedConfig.RuleEntry;
};
const everyRuleConfigs: EveryRuleEntryObject = {
  "astige-every/max-tokens-per-file": [
    WARN,
    {
      js: 2_000,
      ts: 2_000,
      tsx: 2_000,
    },
  ],
};

export const everyPlugin: FlatConfig.Plugin = { rules: everyRules };
// TODO: Setup no-op parser and make work in this config
export const everyConfig: FlatConfig.Config = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME_EVERY]: everyPlugin },
  rules: everyRuleConfigs,
};
