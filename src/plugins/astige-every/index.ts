import { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { SEVERITY } from "../../constants";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";

const PLUGIN_NAME_EVERY = "astige-every";
type EveryRuleEntryObject = { [K in PrefixedEveryRuleName]: SharedConfig.RuleEntry };
type PrefixedEveryRuleName = `${typeof PLUGIN_NAME_EVERY}/${keyof typeof everyRules}`;
const everyRules = {
  "max-tokens-per-file": maxTokensPerFile,
};
const everyRuleConfigs: EveryRuleEntryObject = {
  "astige-every/max-tokens-per-file": [
    SEVERITY.WARN,
    {
      js: 2_000,
      ts: 2_000,
      tsx: 2_000,
    },
  ] as const,
};
// TODO: Setup no-op parser and make work in this config
export const everyConfig: {
  files: FlatConfig.Config["files"];
  plugins: { [PLUGIN_NAME_EVERY]: FlatConfig.Plugin };
  rules: EveryRuleEntryObject;
} = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME_EVERY]: { rules: everyRules } },
  rules: everyRuleConfigs,
} as const;
