const PLUGIN_NAME_JAVASCRIPT = "astige-javascript";
import type { FlatConfig, SharedConfig } from "@typescript-eslint/utils/ts-eslint";
import { SEVERITY } from "../../constants";
import { ftaComplexityCouldBeBetter, ftaComplexityNeedsImprovement } from "./rules/ftaComplexity/ftaComplexity";
import { noImportAs } from "./rules/noImportAs/noImportAs";
import { noTsxWithoutJsx } from "./rules/noTsxWithoutJsx/noTsxWithoutJsx";

// TODO: Improve this pattern overall and apply to all sub-plugins

// TODO: Put rule types in here somehow from the actual rules so we config them right?
// TODO: * Apply to all rules?
type JavascriptRuleEntryObject = { [K in PrefixedJavascriptRuleName]: SharedConfig.RuleEntry };
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

export const javascriptConfig: {
  files: FlatConfig.Config["files"];
  plugins: { [PLUGIN_NAME_JAVASCRIPT]: FlatConfig.Plugin };
  rules: JavascriptRuleEntryObject;
} = {
  files: ["**/*.{js,ts,jsx,tsx}"],
  plugins: { [PLUGIN_NAME_JAVASCRIPT]: { rules: javascriptRules } },
  rules: javascriptRuleConfigs,
} as const;
