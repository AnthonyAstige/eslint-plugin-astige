// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import type { FlatConfig, Linter, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
import { maxTokensPerFile } from "./rules/maxTokensPerFile/maxTokensPerFile";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

const SEVERITY = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
} as const;

const PLUGIN_NAME = "astige";

const javascriptRules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "no-import-as": noImportAs,
  "max-tokens-per-file": maxTokensPerFile,
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
};
type PrefixedJavaScriptRuleName = `${typeof PLUGIN_NAME}/${keyof typeof javascriptRules}`;
const javascriptRuleConfigs: RuleEntryObject = {
  "astige/fta-complexity-could-be-better": [
    SEVERITY.WARN,
    { "when-above": 55, "when-at-or-under": 75 },
  ] as const,
  "astige/fta-complexity-needs-improvement": [
    SEVERITY.ERROR,
    { "when-above": 75 },
  ] as const,
  "astige/max-tokens-per-file": [
    SEVERITY.WARN,
    {
      js: 2_000,
      ts: 2_000,
      tsx: 2_000,
    },
  ] as const,
  "astige/no-import-as": SEVERITY.ERROR,
  "astige/no-tsx-without-jsx": SEVERITY.ERROR,
};

// TODO: Put rule types in here somehow from the actual rules so we config them right?
type RuleEntryObject = { [K in PrefixedJavaScriptRuleName]: SharedConfig.RuleEntry };
const recommended: {
  files: FlatConfig.Config["files"];
  plugins: { "astige": FlatConfig.Plugin };
  rules: RuleEntryObject;
} = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { "astige": { rules: javascriptRules } },
  rules: javascriptRuleConfigs,
} as const;

const configs = {
  recommended,
};

const auto: FlatConfig.Config[] = [
  recommended,
];

export { auto, configs, javascriptRules as rules };
