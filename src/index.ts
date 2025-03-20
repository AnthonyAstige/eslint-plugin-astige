// TODO: Update docs that this is a collection of plugins in a single plugin
// TODO: * Maybe rename this to plugins?
// TODO: * Explain why: Single repository, but allows splitting of plugin loading and processing per file type etc (like plugins do)
// TODO: Split up this file and get organized
// TODO: Pull in other eslint repositories I've made into here
// TODO: * Updating their READMEs to point here, depublishing on NPM (is that good to do?), etc
// TODO: * Add lint rule tests (figure out how to do it right)
// TODO: Add recommended config and use it in my repository instead of configing there
// TODO: * Pull in all my config from repository and document it well in here
// TODO: Self-apply my full eslint system to this repository
import type { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { SEVERITY } from "./constants";
import { everyConfig } from "./plugins/astige-every";
import {
  ftaComplexityCouldBeBetter,
  ftaComplexityNeedsImprovement,
} from "./plugins/astige-javascript/rules/ftaComplexity/ftaComplexity";
import { noImportAs } from "./plugins/astige-javascript/rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./plugins/astige-javascript/rules/noTsxWithoutJsx/noTsxWithoutJsx";

const PLUGIN_NAME_JAVASCRIPT = "astige-javascript";

const javascriptRules = {
  "no-tsx-without-jsx": noTsxWithoutJsx,
  "no-import-as": noImportAs,
  "fta-complexity-could-be-better": ftaComplexityCouldBeBetter,
  "fta-complexity-needs-improvement": ftaComplexityNeedsImprovement,
};
type PrefixedJavascriptRuleName = `${typeof PLUGIN_NAME_JAVASCRIPT}/${keyof typeof javascriptRules}`;
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

const configs = {
  recommended: javascriptConfig,
  every: everyConfig,
};

const auto: FlatConfig.Config[] = [
  javascriptConfig,
  everyConfig,
];

export { auto, configs };
