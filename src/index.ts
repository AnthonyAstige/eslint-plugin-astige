// TODO: Split up this file and get organized
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import type { FlatConfig, Linter, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { maxTokensPerFile } from "./plugins/astige-every/rules/maxTokensPerFile/maxTokensPerFile";
import {
  ftaComplexityCouldBeBetter,
  ftaComplexityNeedsImprovement,
} from "./plugins/astige-javascript/rules/ftaComplexity/ftaComplexity";
import { noImportAs } from "./plugins/astige-javascript/rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./plugins/astige-javascript/rules/noTsxWithoutJsx/noTsxWithoutJsx";

const SEVERITY = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
} as const;

const PLUGIN_NAME_JAVASCRIPT = "astige-javascript";
const PLUGIN_NAME_EVERY = "astige-every";

const everyRules = {
  "max-tokens-per-file": maxTokensPerFile,
};
const javascriptRules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "no-import-as": noImportAs,
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
};
type PrefixedJavascriptRuleName = `${typeof PLUGIN_NAME_JAVASCRIPT}/${keyof typeof javascriptRules}`;
type PrefixedEveryRuleName = `${typeof PLUGIN_NAME_EVERY}/${keyof typeof everyRules}`;
type EveryRuleEntryObject = { [K in PrefixedEveryRuleName]: SharedConfig.RuleEntry };
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
const javascriptRuleConfigs: JavascriptRuleEntryObject = {
  "astige-javascript/fta-complexity-could-be-better": [
    SEVERITY.WARN,
    { "when-above": 55, "when-at-or-under": 75 },
  ] as const,
  "astige-javascript/fta-complexity-needs-improvement": [
    SEVERITY.ERROR,
    { "when-above": 75 },
  ] as const,
  "astige-javascript/no-import-as": SEVERITY.ERROR,
  "astige-javascript/no-tsx-without-jsx": SEVERITY.ERROR,
};

// TODO: Put rule types in here somehow from the actual rules so we config them right?
type JavascriptRuleEntryObject = { [K in PrefixedJavascriptRuleName]: SharedConfig.RuleEntry };
const javascriptConfig: {
  files: FlatConfig.Config["files"];
  plugins: { [PLUGIN_NAME_JAVASCRIPT]: FlatConfig.Plugin };
  rules: JavascriptRuleEntryObject;
} = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME_JAVASCRIPT]: { rules: javascriptRules } },
  rules: javascriptRuleConfigs,
} as const;

// TODO: Setup no-op parser and make work in this config
const everyConfig: {
  files: FlatConfig.Config["files"];
  plugins: { [PLUGIN_NAME_EVERY]: FlatConfig.Plugin };
  rules: EveryRuleEntryObject;
} = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME_EVERY]: { rules: everyRules } },
  rules: everyRuleConfigs,
} as const;

const configs = {
  recommended: javascriptConfig,
  every: everyConfig,
};

const auto: FlatConfig.Config[] = [
  javascriptConfig,
  everyConfig,
];

const allTheRules = { ...javascriptRules, ...everyRules };
export { allTheRules as rules, auto, configs };
